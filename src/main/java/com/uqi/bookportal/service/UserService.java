package com.uqi.bookportal.service;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.uqi.bookportal.model.User;
import com.uqi.bookportal.model.UserDetailsAdapter;
import com.uqi.bookportal.model.dto.UserDTO;
import com.uqi.bookportal.model.dto.UserUpdateDTO;
import com.uqi.bookportal.repo.BookRepository;
import com.uqi.bookportal.repo.RoleRepository;
import com.uqi.bookportal.repo.UserRepository;

@Service
public class UserService implements UserDetailsService {

	private final UserRepository userRepository;

	private final BookRepository bookRepository;

	private final RoleRepository roleRepository;

	private final PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, RoleRepository roleRepository, BookRepository bookRepository,
			PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.bookRepository = bookRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public User addBookToReadingList(long userId, long bookId) {

		var user = this.findById(userId);
		var bookOpt = bookRepository.findById(bookId);
		bookOpt.ifPresent(user::addToReadingList);
		return userRepository.save(user);
	}

	public User addBookToFavoriteList(long userId, long bookId) {

		var user = this.findById(userId);
		var bookOpt = bookRepository.findById(bookId);
		bookOpt.ifPresent(user::addToFavoriteList);
		return userRepository.save(user);
	}

	public User removeBookFromReadingList(long userId, long bookId) {

		var user = this.findById(userId);
		var bookOpt = bookRepository.findById(bookId);
		bookOpt.ifPresent(user::removeFromReadingList);
		return userRepository.save(user);
	}

	public User removeBookFromFavoriteList(long userId, long bookId) {

		var user = this.findById(userId);
		var bookOpt = bookRepository.findById(bookId);
		bookOpt.ifPresent(user::removeFromFavoriteList);
		return userRepository.save(user);
	}

	public User save(UserDTO userDTO) {

		var user = new User();
		user.setUsername(userDTO.getUsername());
		user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		var userRoleOpt = roleRepository.findByName("ROLE_USER");
		userRoleOpt.ifPresent((userRole) -> {
			user.setRoles(Set.of(userRoleOpt.get()));
		});
		return userRepository.save(user);
	}

	public List<User> getUsersWithRole(List<String> roles) {
		return userRepository.findByRoles_NameIn(roles);
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User findByUsername(String username) {
		var userOpt = userRepository.findByUsername(username);
		return userOpt.orElseThrow(() -> {
			throw new IllegalArgumentException("User not found");
		});
	}

	public User findByName(String name) {
		var userOpt = userRepository.findByName(name);
		return userOpt.orElseThrow(() -> {
			throw new IllegalArgumentException("User not found");
		});
	}

	public List<User> findAllByUsername(String username) {
		return userRepository.findByUsernameStartsWithAndActiveTrueOrderByCreateDateDesc(username);
	}

	public User findById(long id) {
		var userOpt = userRepository.findById(id);
		return userOpt.orElseThrow(() -> {
			throw new IllegalArgumentException("User not found");
		});
	}

	public Page<User> findAllWithJpaPagination(int pageNumber, int pageSize) {
		var paged = PageRequest.of(pageNumber, pageSize);
		return userRepository.findAll(paged);
	}

	public User update(long id, UserUpdateDTO userUpdateDTO) {
		var user = this.findById(id);
		user.setPassword(passwordEncoder.encode(userUpdateDTO.getPassword()));
		return userRepository.save(user);
	}

	public User remove(long id) {
		var user = this.findById(id);
		user.setActive(!user.isActive());
		return userRepository.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		var user = this.findByUsername(username);
		return new UserDetailsAdapter(user);
	}

}
