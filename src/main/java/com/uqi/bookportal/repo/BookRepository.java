package com.uqi.bookportal.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uqi.bookportal.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

	Optional<Book> findByTitle(String title);

	Optional<Book> findByYear(int year);

	Optional<Book> findByPublisher(String publisher);

	Optional<Book> findByIsbn(long isbn);

	boolean existsByTitle(String title);

}
