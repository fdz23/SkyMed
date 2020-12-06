package com.skynet.skymed.config;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skynet.skymed.model.Usuario;
import com.skynet.skymed.util.GeradorDeSenha;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTAuthenticationFilter  extends UsernamePasswordAuthenticationFilter {
 
	private AuthenticationManager authentiationManager;
	
	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		
		this.authentiationManager = authenticationManager;
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException {
		
		try {
			Usuario usuario =  new ObjectMapper().readValue(request.getInputStream(),Usuario.class);
			 return this.authentiationManager
					 .authenticate(new UsernamePasswordAuthenticationToken(usuario.getEmail(), GeradorDeSenha.geraSenhaSegura(usuario.getSenha(), usuario.getEmail())));
		} catch (IOException e) {
			
			throw new RuntimeException(e);
		}
		 
	}
	
	@Override
	 protected void successfulAuthentication(HttpServletRequest request,
			 HttpServletResponse response 
			 , FilterChain chain, 
			 Authentication authResult) throws IOException {
		
		String username =  ((org.springframework.security.core.userdetails.User)authResult.getPrincipal()).getUsername();
		 String token = Jwts
				 .builder().
				 setSubject(username)
				 .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
				 .signWith(SignatureAlgorithm.HS512,SecurityConstants.SECRET)
				 .compact();
		 
		 response.addHeader(SecurityConstants.HEADER_STRING,SecurityConstants.TOKEN_PREFIX + token);
		 
		 response.getWriter().write("{" + "\"token\": \"" + token + "\"}");
		 
	 }
	
	
}
