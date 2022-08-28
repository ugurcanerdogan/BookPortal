package com.uqi.bookportal.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.uqi.bookportal.model.UserDetailsAdapter;
import com.uqi.bookportal.repo.UserRepository;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtFilter extends OncePerRequestFilter {

	private final UserRepository userRepository;

	private final TokenManager tokenManager;

	public JwtFilter(UserRepository userRepository, TokenManager tokenManager) {
		this.userRepository = userRepository;
		this.tokenManager = tokenManager;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String tokenHeader = request.getHeader("Authorization");
		String username = null;
		String token = null;
		if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
			token = tokenHeader.substring(7);
			try {
				username = tokenManager.getUsernameFromToken(token);
			}
			catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			}
			catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
			}
		}
		else {
			System.out.println("Bearer String not found in token");
		}

		if (null != username && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = new UserDetailsAdapter(userRepository.findByUsername(username).get());
			if (tokenManager.validateJwtToken(token, userDetails)) {
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			}
		}
		filterChain.doFilter(request, response);
	}

}
