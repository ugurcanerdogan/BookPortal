package com.uqi.bookportal.model.dto;

import javax.validation.constraints.Size;

public class UserUpdateDTO {

	@Size(max = 255, min = 3, message = "Please enter a valid name")
	private String name;

	@Size(max = 255, min = 3, message = "Please enter a valid password")
	private String password;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
