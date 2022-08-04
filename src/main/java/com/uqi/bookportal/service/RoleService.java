package com.uqi.bookportal.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uqi.bookportal.model.Role;
import com.uqi.bookportal.model.dto.RoleDTO;
import com.uqi.bookportal.model.dto.RoleUpdateDTO;
import com.uqi.bookportal.repo.RoleRepository;

@Service
public class RoleService {

	private final RoleRepository roleRepository;

	public RoleService(RoleRepository roleRepository) {
		this.roleRepository = roleRepository;
	}

	public Role save(RoleDTO roleDTO) {

		var role = new Role();
		role.setName(roleDTO.getName());
		return roleRepository.save(role);
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
