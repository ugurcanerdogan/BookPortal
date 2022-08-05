package com.uqi.bookportal.exception;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler(Throwable.class)
	public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, Throwable t) {
		LOGGER.error(t.getMessage(), t);
		var map = new HashMap<>();
		map.put("Error message", "Unknown error occured...");
		return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleValidationException(HttpServletRequest request, Throwable t) {
		LOGGER.error(t.getMessage(), t);
		var map = new HashMap<>();
		map.put("Error", t.getMessage());
		return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<?> handleDatabaseException(HttpServletRequest request, Throwable t) {
		LOGGER.error(t.getMessage(), t);
		var map = new HashMap<>();
		map.put("Error message", "DB error occured...");
		return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<?> handleAuthException(HttpServletRequest request, Throwable t) {
		LOGGER.error(t.getMessage(), t);
		var map = new HashMap<>();
		map.put("Error message", "Authentication error occured...");
		return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);

	}

}
