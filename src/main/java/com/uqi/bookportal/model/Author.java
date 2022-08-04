package com.uqi.bookportal.model;

import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Authors")
public class Author extends EntityBase {

	@Column(name = "NAME", length = 255, unique = true)
	private String name;

	@Column(name = "EMAIL", length = 255, unique = true)
	private String email;

	@Column(name = "GENDER")
	private char gender;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public char getGender() {
		return gender;
	}

	public void setGender(char gender) {
		this.gender = gender;
	}

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinTable(name = "AUTHORS_BOOKS", joinColumns = { @JoinColumn(name = "AUTHOR_ID", referencedColumnName = "ID") },
			inverseJoinColumns = { @JoinColumn(name = "BOOK_ID", referencedColumnName = "ID") })
	@JsonManagedReference
	private Set<Book> books;

}
