package com.uqi.bookportal.repo;

import java.util.List;
import java.util.Optional;

import com.uqi.bookportal.model.Book;
import com.uqi.bookportal.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.uqi.bookportal.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {

	Optional<Author> findByName(String name);

	Optional<Author> findByEmail(String email);

	boolean existsByName(String name);

	boolean existsByEmail(String email);

	Page<Author> findAllByActiveTrue(Pageable pageable);

	List<Author> findByBooks_TitleIn(List<String> books);

}
