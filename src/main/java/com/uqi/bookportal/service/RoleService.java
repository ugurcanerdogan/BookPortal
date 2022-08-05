package com.uqi.bookportal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uqi.bookportal.model.Role;
import com.uqi.bookportal.model.User;
import com.uqi.bookportal.model.dto.RoleDTO;
import com.uqi.bookportal.model.dto.RoleUpdateDTO;
import com.uqi.bookportal.repo.RoleRepository;
import com.uqi.bookportal.repo.UserRepository;

@Service
public class RoleService {

	private final RoleRepository roleRepository;

	private final UserRepository userRepository;

	public RoleService(RoleRepository roleRepository, UserRepository userRepository) {
		this.roleRepository = roleRepository;
		this.userRepository = userRepository;
	}

	public Role save(RoleDTO roleDTO) {

		var role = new Role();
		role.setName(roleDTO.getName());
		return roleRepository.save(role);
	}

	public User addRoleToUser(long roleId, long userId) {
		Optional<User> user = userRepository.findById(userId);
		Optional<Role> role = roleRepository.findById(roleId);

		if (user.isPresent()) {
			if (role.isPresent()) {
				user.get().addRole(role.get());
				roleRepository.save(role.get());
				return userRepository.save(user.get());
			}
		}
		throw new IllegalArgumentException("User or Role not found to add!");
	}

	public User removeRoleFromUser(long roleId, long userId) {
		Optional<User> user = userRepository.findById(userId);
		Optional<Role> role = roleRepository.findById(roleId);

		if (user.isPresent()) {
			if (role.isPresent()) {
				user.get().removeRole(role.get());
				roleRepository.save(role.get());
				return userRepository.save(user.get());
			}
		}
		throw new IllegalArgumentException("User or Role not found to remove!");

	}

	public List<Role> findAll() {
		return roleRepository.findAll();
	}

	public Role findByRoleName(String roleName) {
		var roleOpt = roleRepository.findByName(roleName);
		return roleOpt.orElseThrow(() -> {
			throw new IllegalArgumentException("Role not found");
		});
	}

	public Role findById(long id) {
		var roleOpt = roleRepository.findById(id);
		return roleOpt.orElseThrow(() -> {
			throw new IllegalArgumentException("Role not found");
		});
	}

	public Page<Role> findAllWithJpaPagination(int pageNumber, int pageSize) {
		var paged = PageRequest.of(pageNumber, pageSize);
		return roleRepository.findAll(paged);
	}

	public Role update(long id, RoleUpdateDTO roleUpdateDTO) {
		var role = this.findById(id);
		role.setName(roleUpdateDTO.getName());
		return roleRepository.save(role);
	}

	public Role remove(long id) {
		var role = this.findById(id);
		role.setActive(!role.isActive());
		return roleRepository.save(role);
	}

}
