package com.uqi.bookportal.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.uqi.bookportal.model.Role;
import com.uqi.bookportal.model.User;
import com.uqi.bookportal.model.dto.RoleDTO;
import com.uqi.bookportal.model.dto.RoleUpdateDTO;
import com.uqi.bookportal.service.RoleService;

@RestController
@RequestMapping("/api/v1/roles")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class RoleController {

	private final RoleService roleService;

	public RoleController(RoleService roleService) {
		this.roleService = roleService;
	}

	@PostMapping("")
	public ResponseEntity<Role> createRole(@Valid @RequestBody RoleDTO roleDTO) {
		return ResponseEntity.ok(roleService.save(roleDTO));

	}

	@PostMapping("/add-role-to-user")
	public ResponseEntity<User> addRoleToUser(@RequestParam(name = "roleId") long roleId,
			@RequestParam(name = "userId") long userId) {
		return ResponseEntity.ok(roleService.addRoleToUser(roleId, userId));

	}

	@PostMapping("/remove-role-from-user")
	public ResponseEntity<User> removeRoleFromUser(@RequestParam(name = "roleId") long roleId,
			@RequestParam(name = "userId") long userId) {
		return ResponseEntity.ok(roleService.removeRoleFromUser(roleId, userId));

	}

	@GetMapping("")
	public ResponseEntity<List<Role>> getRoles() {
		return ResponseEntity.ok(roleService.findAll());
	}

	@GetMapping("/by-role-name")
	public ResponseEntity<Role> searchRoles(@RequestParam(name = "roleName") String roleName) {
		return ResponseEntity.ok(roleService.findByRoleName(roleName));
	}

	@GetMapping("/with-jpa-pagination")
	public ResponseEntity<Page<Role>> getRolesWithJpaPagination(
			@RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
			@RequestParam(name = "pageSize", defaultValue = "5") int pageSize) {
		return ResponseEntity.ok(roleService.findAllWithJpaPagination(pageNumber, pageSize));
	}

	@GetMapping("/{roleId}")
	public ResponseEntity<Role> getRole(@PathVariable(name = "roleId") long id) {
		return ResponseEntity.ok(roleService.findById(id));
	}

	@PutMapping("/{roleId}")
	public ResponseEntity<Role> updateRole(@PathVariable(name = "roleId") long id,
			@Valid @RequestBody RoleUpdateDTO roleUpdateDTO) {
		return ResponseEntity.ok(roleService.update(id, roleUpdateDTO));
	}

	@DeleteMapping("/{roleId}")
	public ResponseEntity<Role> removeRole(@PathVariable(name = "roleId") long id) {
		return ResponseEntity.ok(roleService.remove(id));
	}

}
