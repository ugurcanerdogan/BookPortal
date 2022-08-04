package com.uqi.bookportal.model;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.CollectionUtils;

public class UserDetailsAdapter implements UserDetails {

	private final User user;

	public UserDetailsAdapter(User user) {
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		if (Objects.nonNull(user) && !CollectionUtils.isEmpty(user.getRoles())) {
			return user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).toList();
		}
		return Collections.emptyList();
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return user.isActive();
	}

	@Override
	public boolean isAccountNonLocked() {
		return user.isActive();
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return user.isActive();
	}

	@Override
	public boolean isEnabled() {
		return user.isActive();
	}

}
