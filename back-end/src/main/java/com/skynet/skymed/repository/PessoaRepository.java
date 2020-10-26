package com.skynet.skymed.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import com.skynet.skymed.model.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

	@Query("select p from pessoa p where p.cpf = ?1")
	Pessoa verificaCpfExistente(String cpf);

	@Query("select p from pessoa p where p.rg = ?1")
	Pessoa verificaRgExistente(String rg);

	@Query("select p from pessoa p where p.email = ?1")
	Pessoa verificaEmailExistente(String email);

	@Query(value = "select p.pes_iden from pessoa p where p.pes_eh_paciente = true", nativeQuery = true)
	ArrayList<Pessoa> obtenhaPacientes();
}
