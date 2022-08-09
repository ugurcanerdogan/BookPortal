package com.uqi.bookportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uqi.bookportal.model.dto.RegistrationRequest;
import com.uqi.bookportal.service.RegistrationService;

@RestController
@RequestMapping(path = "/api/v1/registration")
@CrossOrigin
public class RegistrationController {

	private final RegistrationService registrationService;

	@Autowired
	public RegistrationController(RegistrationService registrationService) {
		this.registrationService = registrationService;
	}

	@PostMapping
	public ResponseEntity<String> register(@RequestBody RegistrationRequest request) {
		return registrationService.register(request);
	}

}
