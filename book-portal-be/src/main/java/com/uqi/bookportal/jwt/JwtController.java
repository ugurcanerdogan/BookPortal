package com.uqi.bookportal.jwt;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.uqi.bookportal.model.User;
import com.uqi.bookportal.model.UserDetailsAdapter;
import com.uqi.bookportal.repo.UserRepository;

@RestController
@CrossOrigin
public class JwtController {

	private final UserRepository userRepository;

	private final AuthenticationManager authenticationManager;

	private final TokenManager tokenManager;

	public JwtController(UserRepository userRepository, AuthenticationManager authenticationManager,
			TokenManager tokenManager) {
		this.userRepository = userRepository;
		this.authenticationManager = authenticationManager;
		this.tokenManager = tokenManager;
	}

	@PostMapping("/api/v1/login")
	public ResponseEntity createToken(@RequestBody JwtRequestModel request) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		}
		catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		}
		catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
		final Optional<User> user = userRepository.findByUsername(request.getUsername());
		final UserDetailsAdapter userDetails = new UserDetailsAdapter(user.get());
		final String jwtToken = tokenManager.generateJwtToken(userDetails);
		return ResponseEntity.ok(new JwtResponseModel(jwtToken, userDetails.getUser().getId(), !userDetails.isEnabled(),
				userDetails.getUser().getName()));
	}

}
