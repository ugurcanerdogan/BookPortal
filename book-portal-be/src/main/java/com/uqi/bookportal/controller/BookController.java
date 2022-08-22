package com.uqi.bookportal.controller;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.uqi.bookportal.model.Author;
import com.uqi.bookportal.model.Book;
import com.uqi.bookportal.model.User;
import com.uqi.bookportal.model.dto.BookUpdateDTO;
import com.uqi.bookportal.service.BookService;

@RestController
@RequestMapping("/api/v1/books")
@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
public class BookController {

	private final BookService bookService;

	public BookController(BookService bookService) {
		this.bookService = bookService;
	}

	@PostMapping("")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Book> createBook(@Valid @RequestBody String input) throws IOException {
		return ResponseEntity.ok(bookService.save(input));
	}

	@GetMapping("")
	public ResponseEntity<List<Book>> getBooks() {
		return ResponseEntity.ok(bookService.findAll());
	}

	@GetMapping("/all-by-book-title")
	public ResponseEntity<List<Book>> searchBooksByTitle(@RequestParam(name = "bookTitle") String bookTitle) {
		return ResponseEntity.ok(bookService.findAllByTitle(bookTitle));
	}

	@GetMapping("/all-by-year")
	public ResponseEntity<List<Book>> searchBooksByYear(@RequestParam(name = "year") int year) {
		return ResponseEntity.ok(bookService.findAllByYear(year));
	}

	@GetMapping("/all-by-publisher")
	public ResponseEntity<List<Book>> searchBooksByPublisher(@RequestParam(name = "publisher") String publisher) {
		return ResponseEntity.ok(bookService.findAllByPublisher(publisher));
	}

	@GetMapping("/by-isbn")
	public ResponseEntity<Book> searchBookByIsbn(@RequestParam(name = "isbn") long isbn) {
		return ResponseEntity.ok(bookService.findByISBN(isbn));
	}

	@GetMapping("/all-by-contains-title")
	public ResponseEntity<List<Book>> searchBooksByContainingBookTitle(
			@RequestParam(name = "bookTitle") String bookTitle) {
		return ResponseEntity.ok(bookService.findByTitleContaining(bookTitle));
	}

	@GetMapping("/with-jpa-pagination")
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

	@GetMapping("/{bookId}/getUsersAddedThisToReadingList")
	public ResponseEntity<Set<User>> getUsersAddedThisToReadingList(@PathVariable(name = "bookId") long id) {
		return ResponseEntity.ok(bookService.getUsersWhoAddedToReadingList(id));
	}

	@GetMapping("/{bookId}/getUsersAddedThisToFavoriteList")
	public ResponseEntity<Set<User>> getUsersAddedThisToFavoriteList(@PathVariable(name = "bookId") long id) {
		return ResponseEntity.ok(bookService.getUsersWhoAddedToFavList(id));
	}

	@GetMapping("/{bookId}/getAuthors")
	public ResponseEntity<Set<Author>> getAuthorsOfBook(@PathVariable(name = "bookId") long id) {
		return ResponseEntity.ok(bookService.getAuthorsOfBook(id));
	}

}
