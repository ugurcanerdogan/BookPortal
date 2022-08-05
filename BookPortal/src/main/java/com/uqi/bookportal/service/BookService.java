package com.uqi.bookportal.service;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uqi.bookportal.model.Author;
import com.uqi.bookportal.model.Book;
import com.uqi.bookportal.model.dto.AuthorDTO;
import com.uqi.bookportal.model.dto.BookDTO;
import com.uqi.bookportal.model.dto.BookUpdateDTO;
import com.uqi.bookportal.repo.AuthorRepository;
import com.uqi.bookportal.repo.BookRepository;

@Service
public class BookService {

	private final BookRepository bookRepository;

	private final AuthorRepository authorRepository;

	public BookService(BookRepository bookRepository, AuthorRepository authorRepository) {
		this.bookRepository = bookRepository;
		this.authorRepository = authorRepository;
	}

	public Book save(String input) throws IOException {

		ObjectMapper objectMapper = new ObjectMapper();
		List<Object> bookAndAuthor = objectMapper.readValue(input, new TypeReference<List<Object>>() {
		});
		BookDTO bookDto = objectMapper.convertValue(bookAndAuthor.get(0), BookDTO.class);
		AuthorDTO authorDto = objectMapper.convertValue(bookAndAuthor.get(1), AuthorDTO.class);

		if (!bookRepository.existsByTitle(bookDto.getTitle())) {
			if (!authorRepository.existsByEmail(authorDto.getEmail())) {
				Author author = new Author();
				author.setName(authorDto.getName());
				author.setEmail(authorDto.getEmail());
				author.setGender(authorDto.getGender());
				author.setBooks(new HashSet<>());

				Book book = new Book();
				book.setTitle(bookDto.getTitle());
				book.setPublisher(bookDto.getPublisher());
				book.setYear(bookDto.getYear());
				book.setIsbn(bookDto.getIsbn());
				book.setAuthors(new HashSet<>());

				author.addToBooks(book);

				var bookToReturn = bookRepository.save(book);
				authorRepository.save(author);
				return bookToReturn;
			}
			else {
				Author author = authorRepository.findByEmail(authorDto.getEmail()).get();
				Book book = new Book();
				book.setTitle(bookDto.getTitle());
				book.setPublisher(bookDto.getPublisher());
				book.setYear(bookDto.getYear());
				book.setIsbn(bookDto.getIsbn());
				book.setAuthors(new HashSet<>());

				author.addToBooks(book);

				var bookToReturn = bookRepository.save(book);
				authorRepository.save(author);
				return bookToReturn;
			}
		}
		else {
			throw new IllegalArgumentException("Book found with this title!");
		}
	}

	public List<Book> findAll() {
		return bookRepository.findAll();
	}

	public List<Book> findAllByTitle(String title) {
		return bookRepository.findAllByTitle(title);
	}

	public List<Book> findByTitleContaining(String title) {
		return bookRepository.findByTitleContaining(title);
	}

	public List<Book> findAllByYear(int year) {
		return bookRepository.findAllByYear(year);
	}

	public List<Book> findAllByPublisher(String publisher) {
		return bookRepository.findAllByPublisher(publisher);
	}

	public Book findByISBN(long isbn) {
		var bookOpt = bookRepository.findByIsbn(isbn);
		return bookOpt.orElseThrow(() -> {
			throw new IllegalArgumentException("Book not found with this ISBN");
		});
	}

	public Book findById(long id) {
		var bookOpt = bookRepository.findById(id);
		return bookOpt.orElseThrow(() -> {
			throw new IllegalArgumentException("Book not found with this id");
		});
	}

	public Page<Book> findAllWithJpaPagination(int pageNumber, int pageSize) {
		var paged = PageRequest.of(pageNumber, pageSize);
		return bookRepository.findAll(paged);
	}

	public Book update(long id, BookUpdateDTO bookUpdateDTO) {
		var book = this.findById(id);
		if (bookUpdateDTO.getTitle() != null) {
			book.setTitle(bookUpdateDTO.getTitle());
		}
		if (bookUpdateDTO.getYear() != 0) {
			book.setYear(bookUpdateDTO.getYear());
		}
		if (bookUpdateDTO.getPublisher() != null) {
			book.setPublisher(bookUpdateDTO.getPublisher());
		}
		if (bookUpdateDTO.getIsbn() != 0) {
			book.setIsbn(bookUpdateDTO.getIsbn());
		}
		return bookRepository.save(book);
	}

	public Book remove(long id) {
		var book = this.findById(id);
		book.setActive(!book.isActive());
		return bookRepository.save(book);
	}

}
