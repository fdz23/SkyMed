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

	Pessoa findByCpf(String cpf);

	Pessoa findByRg(String rg);

	Pessoa findByEmail(String email);

	@Query(value = "select p.pes_iden from pessoa p where p.pes_cpf = ?1 and p.pes_email =?2", nativeQuery = true)
	Pessoa verificaEmailExistente(String cpf, String email);

	@Query(value = "select p.pes_iden from pessoa p where p.pes_eh_paciente = true", nativeQuery = true)
	ArrayList<Pessoa> obtenhaPacientes();
}
