package com.skynet.skymed.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;

import com.skynet.skymed.model.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

	Pessoa findByCpf(String cpf);

	Pessoa findByRg(String rg);

	Pessoa findByUsuarioEmail(String email);
	
	Pessoa findByUsuarioId(Long id);

	@Query(value = "select p.pes_iden from pessoa p join usuario u on u.usu_iden = p.pes_usu_iden  where u.usu_eh_paciente = true", nativeQuery = true)
	ArrayList<Pessoa> obtenhaPacientes();
}
