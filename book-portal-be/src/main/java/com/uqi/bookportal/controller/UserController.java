package com.uqi.bookportal.controller;

import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.uqi.bookportal.model.Book;
import com.uqi.bookportal.model.User;
import com.uqi.bookportal.model.dto.RegistrationRequest;
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
	public ResponseEntity<User> addBookToFavoriteList(@RequestParam(name = "userId") long userId,
			@RequestParam(name = "bookId") long bookId) {
		return ResponseEntity.ok(userService.addBookToFavoriteList(userId, bookId));
	}

	@PostMapping("/add-book-to-read-list")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<User> addBookToReadList(@RequestParam(name = "userId") long userId,
			@RequestParam(name = "bookId") long bookId) {
		return ResponseEntity.ok(userService.addBookToReadingList(userId, bookId));
	}

	@DeleteMapping("/remove-book-from-favorite-list")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<User> removeBookFromFavoriteList(@RequestParam(name = "userId") long userId,
			@RequestParam(name = "bookId") long bookId) {
		return ResponseEntity.ok(userService.removeBookFromFavoriteList(userId, bookId));
	}

	@DeleteMapping("/remove-book-from-read-list")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<User> removeBookFromReadList(@RequestParam(name = "userId") long userId,
			@RequestParam(name = "bookId") long bookId) {
		return ResponseEntity.ok(userService.removeBookFromReadingList(userId, bookId));
	}

	@PostMapping("")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {
		return ResponseEntity.ok(userService.save(userDTO));

	}

	@GetMapping("")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<List<User>> getUsers() {
		return ResponseEntity.ok(userService.findAll());
	}

	@GetMapping("/by-username")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<User> searchUserByUsername(@RequestParam(name = "username") String username) {
		return ResponseEntity.ok(userService.findByUsername(username));
	}

	@GetMapping("/by-name")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<User> searchUserByName(@RequestParam(name = "name") String name) {
		return ResponseEntity.ok(userService.findByName(name));
	}

	@GetMapping("/all-by-username")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<User>> searchUsersByUsername(@RequestParam(name = "username") String username) {
		return ResponseEntity.ok(userService.findAllByUsername(username));
	}

	@GetMapping("/all-by-contains-name")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<List<User>> searchUsersByName(@RequestParam(name = "name") String name) {
		return ResponseEntity.ok(userService.findAllByName(name));
	}

	@GetMapping("/with-jpa-pagination")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<Page<User>> getUsersWithJpaPagination(
			@RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
			@RequestParam(name = "pageSize", defaultValue = "5") int pageSize,
			@RequestParam(name = "currentUser", defaultValue = "") String username) {
		return ResponseEntity.ok(userService.findAllWithJpaPagination(pageNumber, pageSize, username));
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
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')") // currentUser alınırsa
																	// role_admin olarak
																	// değişecek
	public ResponseEntity<User> updateUser(@Valid @PathVariable(name = "userId") long id,
			@Valid @RequestBody UserUpdateDTO userUpdateDTO) {
		return ResponseEntity.ok(userService.update(id, userUpdateDTO));
	}

	@GetMapping("/{userId}/getReadList")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<Set<Book>> getReadingList(@PathVariable(name = "userId") long id) {
		return ResponseEntity.ok(userService.getUsersReadingList(id));
	}

	@GetMapping("/{userId}/getFavList")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<Set<Book>> getFavoriteList(@PathVariable(name = "userId") long id) {
		return ResponseEntity.ok(userService.getUsersFavoriteList(id));
	}

	@DeleteMapping("/{userId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<User> removeUser(@PathVariable(name = "userId") long id) {
		return ResponseEntity.ok(userService.remove(id));
	}

	@PostMapping("/registration")
	public ResponseEntity<User> register(@RequestBody RegistrationRequest request) {
		return ResponseEntity.ok(userService.register(request));
	}

}
