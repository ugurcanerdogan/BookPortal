package com.uqi.bookportal.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.uqi.bookportal.model.Role;
import com.uqi.bookportal.repo.RoleRepository;

@Component
public class DataLoader implements ApplicationRunner {

	public static final String ROLE_USER = "ROLE_USER";

	public static final String ROLE_ADMIN = "ROLE_ADMIN";

	private final RoleRepository roleRepository;

	public DataLoader(RoleRepository roleRepository) {
		this.roleRepository = roleRepository;

	}

	@Override
	public void run(ApplicationArguments args) {
		var userRoleExists = roleRepository.existsByName(ROLE_USER);
		if (!userRoleExists) {
			var userRole = new Role();
			userRole.setName(ROLE_USER);
			roleRepository.save(userRole);
		}

		var adminRoleExists = roleRepository.existsByName(ROLE_ADMIN);
		if (!adminRoleExists) {
			var adminRole = new Role();
			adminRole.setName(ROLE_ADMIN);
			roleRepository.save(adminRole);
		}
	}

}
