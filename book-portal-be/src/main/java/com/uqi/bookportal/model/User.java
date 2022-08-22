package com.uqi.bookportal.model;

import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Users")
public class User extends EntityBase {

	@Column(name = "NAME", length = 255)
	private String name;

	@Column(name = "USERNAME", length = 255, unique = true)
	private String username;

	@Column(name = "PASSWORD", length = 255)
	private String password;

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinTable(name = "USERS_ROLES", joinColumns = { @JoinColumn(name = "USER_ID", referencedColumnName = "ID") },
			inverseJoinColumns = { @JoinColumn(name = "ROLE_ID", referencedColumnName = "ID") })
	@JsonManagedReference
	private Set<Role> roles;

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinTable(name = "USERS_FAVORITELIST",
			joinColumns = { @JoinColumn(name = "USER_ID", referencedColumnName = "ID") },
			inverseJoinColumns = { @JoinColumn(name = "BOOK_ID", referencedColumnName = "ID") })
	@JsonManagedReference
	private Set<Book> favoriteList;

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinTable(name = "USERS_READLIST", joinColumns = { @JoinColumn(name = "USER_ID", referencedColumnName = "ID") },
			inverseJoinColumns = { @JoinColumn(name = "BOOK_ID", referencedColumnName = "ID") })
	@JsonManagedReference
	private Set<Book> readList;

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Set<Book> getFavoriteList() {
		return favoriteList;
	}

	public void setFavoriteList(Set<Book> favoriteList) {
		this.favoriteList = favoriteList;
	}

	public Set<Book> getReadList() {
		return readList;
	}

	public void setReadList(Set<Book> readList) {
		this.readList = readList;
	}

	public void addToFavoriteList(Book book) {
		if (this.favoriteList.contains(book)) {
			throw new IllegalStateException("Book is already in the favorite list...");
		}
		else {
			this.favoriteList.add(book);
			book.getUsersThatAddedThisFavoriteList().add(this);
		}
	}

	public void removeFromFavoriteList(Book book) {
		Book bookToRemove = this.getFavoriteList().stream().filter(b -> b.getId() == book.getId()).findFirst()
				.orElse(null);
		if (bookToRemove != null) {
			this.getFavoriteList().remove(bookToRemove);
			bookToRemove.getUsersThatAddedThisFavoriteList().remove(this);
		}
	}

	public void addToReadingList(Book book) {
		if (this.readList.contains(book)) {
			throw new IllegalStateException("Book is already in the reading list...");
		}
		else {
			this.readList.add(book);
			book.getUsersThatAddedThisReadingList().add(this);
		}
	}

	public void removeFromReadingList(Book book) {
		Book bookToRemove = this.getReadList().stream().filter(b -> b.getId() == book.getId()).findFirst().orElse(null);
		if (bookToRemove != null) {
			this.getReadList().remove(bookToRemove);
			bookToRemove.getUsersThatAddedThisReadingList().remove(this);
		}
	}

	public void addRole(Role role) {
		this.roles.add(role);
		role.getUsers().add(this);
	}

	public void removeRole(Role role) {
		Role roleToRemove = this.getRoles().stream().filter(r -> r.getId() == role.getId()).findFirst().orElse(null);
		if (roleToRemove != null) {
			this.getRoles().remove(roleToRemove);
			roleToRemove.getUsers().remove(this);
		}
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
