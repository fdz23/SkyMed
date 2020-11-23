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
		List<GrantedAuthority> authorityListPaciente = AuthorityUtils.createAuthorityList("ROLE_PACIENTE", "ROLE_USUARIO");
		List<GrantedAuthority> authorityListMedico = AuthorityUtils.createAuthorityList("ROLE_MEDICO", "ROLE_PACIENTE", "ROLE_USUARIO");
		List<GrantedAuthority> authorityListHospital = AuthorityUtils.createAuthorityList("ROLE_HOSPITAL", "ROLE_PACIENTE", "ROLE_USUARIO");
		List<GrantedAuthority> authorityListAdmin = AuthorityUtils.createAuthorityList("ROLE_MEDICO", "ROLE_HOSPITAL", "ROLE_PACIENTE", "ROLE_ADMIN", "ROLE_USUARIO");

		if (user.getEhAdmin()) {
			return new org.springframework.security.core.userdetails.User(user.getEmail(), encoder.encode(user.getSenha()),
					authorityListAdmin);
		}

		if (user.getEhMedico()) {
			return new org.springframework.security.core.userdetails.User(user.getEmail(), encoder.encode(user.getSenha()),
					authorityListMedico);
		}

		if (user.getEhHospital()) {
			return new org.springframework.security.core.userdetails.User(user.getEmail(), encoder.encode(user.getSenha()),
					authorityListHospital);
		}

		if (user.getEhPaciente()) {
			return new org.springframework.security.core.userdetails.User(user.getEmail(), encoder.encode(user.getSenha()),
					authorityListPaciente);
		}
		
		return null;
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
