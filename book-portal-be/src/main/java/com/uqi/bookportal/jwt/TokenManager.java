package com.uqi.bookportal.jwt;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.uqi.bookportal.model.UserDetailsAdapter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenManager implements Serializable {

	private static final long serialVersionUID = 7008375124389347049L;

	public static final long TOKEN_VALIDITY = 10 * 60 * 60;

	@Value("secret")
	private String jwtSecret;

	public String generateJwtToken(UserDetailsAdapter userDetails) {

		Map<String, Object> claims = new HashMap<>();
		claims.put("role",
				userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));

		return Jwts.builder().addClaims(claims).setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS256, jwtSecret).compact();
	}

	public Boolean validateJwtToken(String token, UserDetails userDetails) {
		String username = getUsernameFromToken(token);
		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
		Boolean isTokenExpired = claims.getExpiration().before(new Date());
		return (username.equals(userDetails.getUsername()) && !isTokenExpired);
	}

	public String getUsernameFromToken(String token) {
		final Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
		return claims.getSubject();
	}

}
