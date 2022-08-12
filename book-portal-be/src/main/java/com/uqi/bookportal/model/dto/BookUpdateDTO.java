package com.uqi.bookportal.model.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

public class BookUpdateDTO {

	@Size(max = 255, min = 3, message = "Please enter a valid title")
	private String title;

	@Min(0)
	@Max(2023)
	private int year;

	@Size(max = 255, min = 3, message = "Please enter a valid publisher")
	private String publisher;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

}
