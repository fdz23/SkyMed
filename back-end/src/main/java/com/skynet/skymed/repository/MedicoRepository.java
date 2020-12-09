package com.skynet.skymed.repository;

import org.springframework.stereotype.Repository;

import com.skynet.skymed.model.Medico;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
	public Medico findByPessoaUsuarioId(Long id);
}
