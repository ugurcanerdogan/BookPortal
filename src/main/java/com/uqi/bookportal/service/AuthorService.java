package com.uqi.bookportal.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uqi.bookportal.model.Author;
import com.uqi.bookportal.model.dto.AuthorDTO;
import com.uqi.bookportal.model.dto.AuthorUpdateDTO;
import com.uqi.bookportal.repo.AuthorRepository;

@Service
public class AuthorService {

	private final AuthorRepository authorRepository;

	public AuthorService(AuthorRepository authorRepository) {
		this.authorRepository = authorRepository;
	}

	public Author save(AuthorDTO authorDTO) {

		var author = new Author();
		author.setName(authorDTO.getName());
		author.setEmail(authorDTO.getEmail());
		author.setGender(authorDTO.getGender());
		return authorRepository.save(author);
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
		if (authorUpdateDTO.getGender() != ' ') {
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
