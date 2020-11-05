package com.skynet.skymed.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.skynet.skymed.model.Usuario;

public interface UsuarioRepository extends PagingAndSortingRepository<Usuario, Long> {

	Usuario findByEmail(String email);
}
