package com.uqi.bookportal.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uqi.bookportal.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

	Optional<User> findByName(String name);

	List<User> findByUsernameStartsWithAndActiveTrueOrderByCreateDateDesc(String username);

	List<User> findByRoles_NameIn(List<String> roles);

}
