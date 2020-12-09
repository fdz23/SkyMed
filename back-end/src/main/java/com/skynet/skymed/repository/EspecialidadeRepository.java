package com.skynet.skymed.repository;

import org.springframework.stereotype.Repository;

import com.skynet.skymed.model.Especialidade;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface EspecialidadeRepository extends JpaRepository<Especialidade, Long> {
	
	Especialidade findByNome(String nome);
	
	

}
