package com.uqi.bookportal.model.dto;

import java.util.Objects;

public record RegistrationRequest(String username, String name, String password) {

	@Override
	public String toString() {
		return "RegistrationRequest{" + "username='" + username + '\'' + ", name='" + name + '\'' + ", password='"
				+ password + '\'' + '}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		RegistrationRequest that = (RegistrationRequest) o;
		return Objects.equals(username, that.username) && Objects.equals(name, that.name)
				&& Objects.equals(password, that.password);
	}

}
