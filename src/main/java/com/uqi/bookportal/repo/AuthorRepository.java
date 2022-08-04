package com.uqi.bookportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uqi.bookportal.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {

}
