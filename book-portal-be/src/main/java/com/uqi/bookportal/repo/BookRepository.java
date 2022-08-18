package com.uqi.bookportal.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.uqi.bookportal.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findAllByTitle(String title);

	List<Book> findByTitleContaining(String title);

	List<Book> findAllByYear(int year);

	List<Book> findAllByPublisher(String publisher);

	Optional<Book> findByIsbn(long isbn);

	Page<Book> findAllByActiveTrue(Pageable pageable);

	boolean existsByTitle(String title);

}
