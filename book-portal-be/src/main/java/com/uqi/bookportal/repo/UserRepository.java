package com.uqi.bookportal.repo;

import java.util.List;
import java.util.Optional;

import com.uqi.bookportal.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uqi.bookportal.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

	Page<User> findAllByActiveTrueAndUsernameNot(String username, Pageable pageable);

	Optional<User> findByName(String name);

	List<User> findByUsernameContaining(String username);

	List<User> findByNameContaining(String name);

	List<User> findByRoles_NameIn(List<String> roles);

}
