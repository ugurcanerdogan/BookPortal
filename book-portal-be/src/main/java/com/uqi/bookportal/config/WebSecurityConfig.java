package com.uqi.bookportal.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.uqi.bookportal.jwt.JwtAuthenticationEntryPoint;
import com.uqi.bookportal.jwt.JwtFilter;
import com.uqi.bookportal.jwt.TokenManager;
import com.uqi.bookportal.repo.UserRepository;
import com.uqi.bookportal.service.UserService;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	private final JwtAuthenticationEntryPoint authenticationEntryPoint;

	private final PasswordEncoder encoder;

	private final UserService userService;

	private final UserRepository userRepository;

	private final TokenManager tokenManager;

	public WebSecurityConfig(PasswordEncoder encoder, JwtAuthenticationEntryPoint authenticationEntryPoint,
			UserService userService, UserRepository userRepository, TokenManager tokenManager) {
		this.encoder = encoder;
		this.authenticationEntryPoint = authenticationEntryPoint;
		this.userService = userService;
		this.userRepository = userRepository;
		this.tokenManager = tokenManager;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService).passwordEncoder(encoder);
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().cors().configurationSource(corsConfigurationSource()).and().authorizeRequests()
				.antMatchers("/api/v1/login").permitAll().antMatchers("/api/v1/users/registration").permitAll()
				.anyRequest().authenticated().and().exceptionHandling()
				.authenticationEntryPoint(authenticationEntryPoint).and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(new JwtFilter(userRepository, tokenManager), UsernamePasswordAuthenticationFilter.class);
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		final CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("*"));
		configuration.setAllowedMethods(List.of("*"));
		configuration.setAllowCredentials(false);
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setExposedHeaders(List.of("*"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
