package com.uqi.bookportal.service;

import com.uqi.bookportal.config.EmailValidator;
import com.uqi.bookportal.model.dto.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegistrationService {

	private final UserService userService;

	private final EmailValidator emailValidator;

	@Autowired
	public RegistrationService(UserService userService, EmailValidator emailValidator) {
		this.userService = userService;
		this.emailValidator = emailValidator;
	}

	@Transactional
	public ResponseEntity register(RegistrationRequest request) {

		boolean isValidEmail = emailValidator.test(request.username());
		if (!isValidEmail) {
			return new ResponseEntity<>("Not a valid email", HttpStatus.NOT_ACCEPTABLE);
		}

		if (!userService.userExists(request.username())) {

			return userService.signUpUser(request.name(), request.username(), request.password());

		}
		return new ResponseEntity<>("email taken", HttpStatus.NOT_ACCEPTABLE);
	}

}
