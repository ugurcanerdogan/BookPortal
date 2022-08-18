package com.uqi.bookportal.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.uqi.bookportal.model.Author;
import com.uqi.bookportal.model.dto.AuthorDTO;
import com.uqi.bookportal.model.dto.AuthorUpdateDTO;
import com.uqi.bookportal.service.AuthorService;

@RestController
@RequestMapping("/api/v1/authors")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AuthorController {

	private final AuthorService authorService;

	public AuthorController(AuthorService authorService) {
		this.authorService = authorService;
	}

	@PostMapping("")
	public ResponseEntity<Author> createAuthor(@Valid @RequestBody AuthorDTO authorDTO) {
		return ResponseEntity.ok(authorService.save(authorDTO));

	}

	@PostMapping("/add-book-to-author")
	public ResponseEntity<Author> addBookToAuthor(@RequestParam(name = "authorId") long authorId,
			@RequestParam(name = "bookId") long bookId) {
		return ResponseEntity.ok(authorService.addBookToAuthor(authorId, bookId));

	}

	@GetMapping("/with-book-title")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<List<Author>> getAuthorsWithBookTitle(@RequestParam(name = "bookTitle") String bookTitle) {
		return ResponseEntity.ok(authorService.getAuthorsWithBook(List.of(bookTitle)));
	}

	@GetMapping("")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<List<Author>> getAuthors() {
		return ResponseEntity.ok(authorService.findAll());
	}

	@GetMapping("/by-author-name")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<Author> searchAuthors(@RequestParam(name = "authorName") String authorName) {
		return ResponseEntity.ok(authorService.findByName(authorName));
	}

	@GetMapping("/with-jpa-pagination")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<Page<Author>> getAuthorsWithJpaPagination(
			@RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
			@RequestParam(name = "pageSize", defaultValue = "5") int pageSize) {
		return ResponseEntity.ok(authorService.findAllWithJpaPagination(pageNumber, pageSize));
	}

	@GetMapping("/{authorId}")
	public ResponseEntity<Author> getAuthor(@PathVariable(name = "authorId") long id) {
		return ResponseEntity.ok(authorService.findById(id));
	}

	@PutMapping("/{authorId}")
	public ResponseEntity<Author> updateAuthor(@PathVariable(name = "authorId") long id,
			@Valid @RequestBody AuthorUpdateDTO authorUpdateDTO) {
		return ResponseEntity.ok(authorService.update(id, authorUpdateDTO));
	}

	@DeleteMapping("/{authorId}")
	public ResponseEntity<Author> removeAuthor(@PathVariable(name = "authorId") long id) {
		return ResponseEntity.ok(authorService.remove(id));
	}

}
