package com.uqi.bookportal.config;

import static javax.servlet.http.HttpServletResponse.SC_FORBIDDEN;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

import com.uqi.bookportal.filter.CustomAuthenticationFilter;
import com.uqi.bookportal.filter.CustomAuthorizationFilter;
import com.uqi.bookportal.repo.UserRepository;
import com.uqi.bookportal.service.UserService;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	private static final String[] AUTH_WHITELIST = { //
			"/api/v1/h2-console", //
			"/api/v1/h2-console/**", //
			"/api/v1/v2/api-docs", //
			"/api/v1/swagger-resources", //
			"/api/v1/swagger-resources/**", //
			"/api/v1/configuration/ui", //
			"/api/v1/configuration/security", //
			"/api/v1/swagger-ui.html", //
			"/api/v1/webjars/**", //
			"/api/v1/graphiql", //
			"/api/v1/api/graphql", //
	};

	private final PasswordEncoder encoder;

	private final UserService userService;

	private final UserRepository userRepository;

	public WebSecurityConfig(PasswordEncoder encoder, UserService userService, UserRepository userRepository) {
		this.encoder = encoder;
		this.userService = userService;
		this.userRepository = userRepository;
	}

	// @Override
	// protected void configure(AuthenticationManagerBuilder auth) {
	// auth.authenticationProvider(daoAuthenticationProvider());
	// }
	//
	// @Bean
	// public DaoAuthenticationProvider daoAuthenticationProvider() {
	// DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
	// provider.setPasswordEncoder(encoder);
	// provider.setUserDetailsService(userService);
	// return provider;
	// }

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService).passwordEncoder(encoder);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(
				authenticationManagerBean());
		customAuthenticationFilter.setFilterProcessesUrl("/api/v1/login");
		http.csrf().disable().cors().configurationSource(corsConfigurationSource()).and().authorizeRequests()
				.antMatchers(AUTH_WHITELIST).anonymous().antMatchers("/api/v1/users/registration/**", "/api/v1/login/**")
				.permitAll().anyRequest().authenticated().and().exceptionHandling()
				.accessDeniedHandler((req, resp, ex) -> resp.setStatus(SC_FORBIDDEN))
				.authenticationEntryPoint((req, resp, ex) -> resp.setStatus(SC_UNAUTHORIZED)).and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilter(customAuthenticationFilter);
		http.addFilterBefore(new CustomAuthorizationFilter(userRepository), UsernamePasswordAuthenticationFilter.class);

		// http.csrf().disable().authorizeRequests().anyRequest().permitAll();
		// Works for GET, POST, PUT, DELETE
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		final CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:3000"));
		configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		configuration.setAllowCredentials(true);
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setExposedHeaders(Arrays.asList("X-Auth-Token", "Authorization", "Access-Control-Allow-Origin",
				"Access-Control-Allow-Credentials"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
