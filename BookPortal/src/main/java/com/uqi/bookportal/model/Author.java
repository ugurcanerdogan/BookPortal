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

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinTable(name = "AUTHORS_BOOKS", joinColumns = { @JoinColumn(name = "AUTHOR_ID", referencedColumnName = "ID") },
			inverseJoinColumns = { @JoinColumn(name = "BOOK_ID", referencedColumnName = "ID") })
	@JsonManagedReference
	private Set<Book> books;

	public void addToBooks(Book book) {
		this.books.add(book);
		book.getAuthors().add(this);
	}

	public void removeFromBooks(Book book) {
		Book bookToRemove = this.getBooks().stream().filter(b -> b.getId() == book.getId()).findFirst().orElse(null);
		if (bookToRemove != null) {
			this.getBooks().remove(bookToRemove);
			bookToRemove.getAuthors().remove(this);
		}
	}

	public Set<Book> getBooks() {
		return books;
	}

	public void setBooks(Set<Book> books) {
		this.books = books;
	}

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

}
