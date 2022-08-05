package com.uqi.bookportal.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uqi.bookportal.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<Role> findByName(String name);

	boolean existsByName(String name);

}
