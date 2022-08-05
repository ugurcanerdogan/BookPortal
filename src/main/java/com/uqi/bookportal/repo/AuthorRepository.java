package com.uqi.bookportal.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uqi.bookportal.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {

	Optional<Author> findByName(String name);

	Optional<Author> findByEmail(String email);

	boolean existsByName(String name);

	boolean existsByEmail(String email);

}
