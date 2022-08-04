package com.uqi.bookportal.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uqi.bookportal.model.Book;
import com.uqi.bookportal.model.dto.BookDTO;
import com.uqi.bookportal.model.dto.BookUpdateDTO;
import com.uqi.bookportal.repo.BookRepository;

@Service
public class BookService {

	private final BookRepository bookRepository;

	public BookService(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	public Book save(BookDTO bookDTO) {

		var book = new Book();
		book.setTitle(bookDTO.getTitle());
		book.setYear(bookDTO.getYear());
		book.setPublisher(bookDTO.getPublisher());
		book.setIsbn(bookDTO.getIsbn());
		return bookRepository.save(book);
	}

	public List<Book> findAll() {
		return bookRepository.findAll();
	}

	public Book findByTitle(String title) {
		var bookOpt = bookRepository.findByTitle(title);
		return bookOpt.orElseThrow(() -> {
			throw new IllegalArgumentException("Book not found");
		});
	}

	public Book findById(long id) {
		var bookOpt = bookRepository.findById(id);
		return bookOpt.orElseThrow(() -> {
			throw new IllegalArgumentException("Book not found");
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
