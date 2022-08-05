package com.uqi.bookportal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uqi.bookportal.model.Author;
import com.uqi.bookportal.model.Book;
import com.uqi.bookportal.model.dto.AuthorDTO;
import com.uqi.bookportal.model.dto.AuthorUpdateDTO;
import com.uqi.bookportal.repo.AuthorRepository;
import com.uqi.bookportal.repo.BookRepository;

@Service
public class AuthorService {

	private final AuthorRepository authorRepository;

	private final BookRepository bookRepository;

	public AuthorService(AuthorRepository authorRepository, BookRepository bookRepository) {
		this.authorRepository = authorRepository;
		this.bookRepository = bookRepository;
	}

	public Author save(AuthorDTO authorDTO) {

		var author = new Author();
		author.setName(authorDTO.getName());
		author.setEmail(authorDTO.getEmail());
		author.setGender(authorDTO.getGender());
		return authorRepository.save(author);
	}

	public Author addBookToAuthor(long authorId, long bookId) {

		Optional<Author> author = authorRepository.findById(authorId);
		Optional<Book> book = bookRepository.findById(bookId);

		author.ifPresent(author1 -> book.ifPresent(author1::addToBooks));
		book.ifPresent(bookRepository::save);

		if (author.isPresent()) {
			return authorRepository.save(author.get());
		}
		throw new IllegalArgumentException("Author not found with this id!");
	}

	public List<Author> findAll() {
		return authorRepository.findAll();
	}

	public Author findByName(String name) {
		var authorOpt = authorRepository.findByName(name);
		return authorOpt.orElseThrow(() -> {
			throw new IllegalArgumentException("Author not found");
		});
	}

	public Author findById(long id) {
		var authorOpt = authorRepository.findById(id);
		return authorOpt.orElseThrow(() -> {
			throw new IllegalArgumentException("Author not found");
		});
	}

	public Page<Author> findAllWithJpaPagination(int pageNumber, int pageSize) {
		var paged = PageRequest.of(pageNumber, pageSize);
		return authorRepository.findAll(paged);
	}

	public Author update(long id, AuthorUpdateDTO authorUpdateDTO) {
		var author = this.findById(id);
		if (authorUpdateDTO.getName() != null) {
			author.setName(authorUpdateDTO.getName());
		}
		if (authorUpdateDTO.getEmail() != null) {
			author.setEmail(authorUpdateDTO.getEmail());
		}
		if (authorUpdateDTO.getGender() != '\0') {
			author.setGender(authorUpdateDTO.getGender());
		}
		return authorRepository.save(author);
	}

	public Author remove(long id) {
		var author = this.findById(id);
		author.setActive(!author.isActive());
		return authorRepository.save(author);
	}

}
