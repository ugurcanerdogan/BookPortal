package com.uqi.bookportal.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uqi.bookportal.model.User;
import com.uqi.bookportal.model.dto.UserDTO;
import com.uqi.bookportal.model.dto.UserUpdateDTO;
import com.uqi.bookportal.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("")
	public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {
		return ResponseEntity.ok(userService.save(userDTO));

	}

	@GetMapping("")
	// @PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	// @Secured("ROLE_ADMIN")// - SECURED
	// @RolesAllowed()// - JSR
	public ResponseEntity<List<User>> getUsers() {
		return ResponseEntity.ok(userService.findAll());
	}

	@GetMapping("/by-username")
	public ResponseEntity<User> searchUsers(@RequestParam(name = "username") String username) {
		return ResponseEntity.ok(userService.findByUsername(username));
	}

	@GetMapping("/with-jpa-pagination")
	public ResponseEntity<Page<User>> getUsersWithJpaPagination(
			@RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
			@RequestParam(name = "pageSize", defaultValue = "5") int pageSize) {
		return ResponseEntity.ok(userService.findAllWithJpaPagination(pageNumber, pageSize));
	}

	@GetMapping("/has-role-user")
	public ResponseEntity<List<User>> getUsersWithUserRole() {
		return ResponseEntity.ok(userService.getUsersWithRole(List.of("ROLE_USER")));
	}

	@GetMapping("/has-role-admin")
	public ResponseEntity<List<User>> getUsersWithAdminRole() {
		return ResponseEntity.ok(userService.getUsersWithRole(List.of("ROLE_ADMIN")));
	}

	@GetMapping("/{userId}")
	public ResponseEntity<User> getUser(@PathVariable(name = "userId") long id) {
		return ResponseEntity.ok(userService.findById(id));
	}

	@PutMapping("/{userId}")
	public ResponseEntity<User> updateUser(@PathVariable(name = "userId") long id,
			@Valid @RequestBody UserUpdateDTO userUpdateDTO) {
		return ResponseEntity.ok(userService.update(id, userUpdateDTO));
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<User> removeUser(@PathVariable(name = "userId") long id) {
		return ResponseEntity.ok(userService.remove(id));
	}

}
