package com.uqi.bookportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uqi.bookportal.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
