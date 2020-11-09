package com.skynet.skymed.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.skynet.skymed.model.Usuario;
import com.skynet.skymed.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Component
public class CustomUserDetailService implements UserDetailsService {
	private final UsuarioRepository usuarioRepository;
	BCryptPasswordEncoder encoder = passwordEncoder();

	@Autowired
	public CustomUserDetailService(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;

	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		Usuario user = Optional.ofNullable(usuarioRepository.findByEmail(email))
				.orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));
		List<GrantedAuthority> authorityListAdmin = AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN");
		List<GrantedAuthority> authorityListUsuer = AuthorityUtils.createAuthorityList("ROLE_USER");

		return new org.springframework.security.core.userdetails.User(user.getEmail(), encoder.encode(user.getSenha()),
				user.isEhAdmin() ? authorityListAdmin : authorityListUsuer);

	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
