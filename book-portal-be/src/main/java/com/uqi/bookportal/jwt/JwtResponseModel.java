package com.uqi.bookportal.jwt;

import java.io.Serializable;

public class JwtResponseModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private final String access_token;

	private final Long id;

	private final boolean banned;

	private final String name;

	public JwtResponseModel(String token, Long id, boolean banned, String name) {
		this.access_token = token;
		this.id = id;
		this.banned = banned;
		this.name = name;
	}

	public String getAccess_token() {
		return access_token;
	}

	public Long getId() {
		return id;
	}

	public boolean isBanned() {
		return banned;
	}

	public String getName() {
		return name;
	}

}
