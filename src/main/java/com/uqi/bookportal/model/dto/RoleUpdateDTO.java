package com.uqi.bookportal.model.dto;

import javax.validation.constraints.Size;

public class RoleUpdateDTO {

	@Size(max = 255, min = 6, message = "Please enter a valid role name")
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
