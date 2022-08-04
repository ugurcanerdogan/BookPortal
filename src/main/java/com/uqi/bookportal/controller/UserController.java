package com.uqi.bookportal.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

	@PostMapping("/add-book-to-favorite-list")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<User> addBookToFavoriteList(long userId, long bookId) {
		return ResponseEntity.ok(userService.addBookToFavoriteList(userId, bookId));
	}

	@PostMapping("/add-book-to-read-list")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<User> addBookToReadList(long userId, long bookId) {
		return ResponseEntity.ok(userService.addBookToReadingList(userId, bookId));
	}

	@DeleteMapping("/remove-book-from-favorite-list")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<User> removeBookFromFavoriteList(long userId, long bookId) {
		return ResponseEntity.ok(userService.removeBookFromFavoriteList(userId, bookId));
	}

	@DeleteMapping("/remove-book-from-read-list")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<User> removeBookFromReadList(long userId, long bookId) {
		return ResponseEntity.ok(userService.removeBookFromReadingList(userId, bookId));
	}

	@PostMapping("")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {
		return ResponseEntity.ok(userService.save(userDTO));

	}

	@GetMapping("")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<User>> getUsers() {
		return ResponseEntity.ok(userService.findAll());
	}

	@GetMapping("/by-username")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<User> searchUsers(@RequestParam(name = "username") String username) {
		return ResponseEntity.ok(userService.findByUsername(username));
	}

	@GetMapping("/with-jpa-pagination")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Page<User>> getUsersWithJpaPagination(
			@RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
			@RequestParam(name = "pageSize", defaultValue = "5") int pageSize) {
		return ResponseEntity.ok(userService.findAllWithJpaPagination(pageNumber, pageSize));
	}

	@GetMapping("/has-role-user")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<User>> getUsersWithUserRole() {
		return ResponseEntity.ok(userService.getUsersWithRole(List.of("ROLE_USER")));
	}

	@GetMapping("/has-role-admin")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<User>> getUsersWithAdminRole() {
		return ResponseEntity.ok(userService.getUsersWithRole(List.of("ROLE_ADMIN")));
	}

	@GetMapping("/{userId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<User> getUser(@PathVariable(name = "userId") long id) {
		return ResponseEntity.ok(userService.findById(id));
	}

	@PutMapping("/{userId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<User> updateUser(@PathVariable(name = "userId") long id,
			@Valid @RequestBody UserUpdateDTO userUpdateDTO) {
		return ResponseEntity.ok(userService.update(id, userUpdateDTO));
	}

	@DeleteMapping("/{userId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<User> removeUser(@PathVariable(name = "userId") long id) {
		return ResponseEntity.ok(userService.remove(id));
	}

}