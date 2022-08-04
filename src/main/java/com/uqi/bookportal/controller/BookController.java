package com.uqi.bookportal.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.uqi.bookportal.model.Book;
import com.uqi.bookportal.model.dto.BookDTO;
import com.uqi.bookportal.model.dto.BookUpdateDTO;
import com.uqi.bookportal.service.BookService;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {

	private final BookService bookService;

	public BookController(BookService bookService) {
		this.bookService = bookService;
	}

	@PostMapping("")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Book> createBook(@Valid @RequestBody BookDTO bookDTO) {
		return ResponseEntity.ok(bookService.save(bookDTO));

	}

	@GetMapping("")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<List<Book>> getBooks() {
		return ResponseEntity.ok(bookService.findAll());
	}

	@GetMapping("/by-book-title")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<Book> searchBookByTitle(@RequestParam(name = "bookTitle") String bookTitle) {
		return ResponseEntity.ok(bookService.findByTitle(bookTitle));
	}

	@GetMapping("/with-jpa-pagination")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	public ResponseEntity<Page<Book>> getBooksWithJpaPagination(
			@RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
			@RequestParam(name = "pageSize", defaultValue = "5") int pageSize) {
		return ResponseEntity.ok(bookService.findAllWithJpaPagination(pageNumber, pageSize));
	}

	@GetMapping("/{bookId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Book> getBook(@PathVariable(name = "bookId") long id) {
		return ResponseEntity.ok(bookService.findById(id));
	}

	@PutMapping("/{bookId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Book> updateBook(@PathVariable(name = "bookId") long id,
			@Valid @RequestBody BookUpdateDTO bookUpdateDTO) {
		return ResponseEntity.ok(bookService.update(id, bookUpdateDTO));
	}

	@DeleteMapping("/{bookId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Book> removeRole(@PathVariable(name = "bookId") long id) {
		return ResponseEntity.ok(bookService.remove(id));
	}

}
