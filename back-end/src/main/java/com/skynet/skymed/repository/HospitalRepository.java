package com.skynet.skymed.repository;

import org.springframework.stereotype.Repository;

import com.skynet.skymed.model.Hospital;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
	Hospital findByPessoaUsuarioId(Long id);
}
