package com.skynet.skymed.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.skynet.skymed.service.CustomUserDetailService;

import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

	private final CustomUserDetailService customUserDetailService;

	public JWTAuthorizationFilter(AuthenticationManager authenticationManager,
			CustomUserDetailService customUserDetailService) {
		super(authenticationManager);
		this.customUserDetailService = customUserDetailService;

	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String header = request.getHeader(SecurityConstants.HEADER_STRING);
		if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
			chain.doFilter(request, response);
			return;
		}

		UsernamePasswordAuthenticationToken authentication = getAuthenteticationToken(request);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(request, response);
	}

	private UsernamePasswordAuthenticationToken getAuthenteticationToken(HttpServletRequest request) {

		String token = request.getHeader(SecurityConstants.HEADER_STRING);
		if (token == null)
			return null;
		String usuarioEmail = Jwts.parser().setSigningKey(SecurityConstants.SECRET)
				.parseClaimsJws(token.replace(SecurityConstants.TOKEN_PREFIX, "")).getBody().getSubject();

		UserDetails userDetails = customUserDetailService.loadUserByUsername(usuarioEmail);

		return usuarioEmail != null ? new UsernamePasswordAuthenticationToken(token, null, userDetails.getAuthorities())
				: null;

	}

}
