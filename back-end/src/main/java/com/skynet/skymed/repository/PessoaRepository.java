package com.skynet.skymed.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skynet.skymed.model.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
 
	
   	@Query("select p from pessoa p where p.cpf = ?1")
	 Pessoa verificaCpfExistente(String cpf);
   	
   	@Query("select p from pessoa p where p.rg = ?1")
	 Pessoa verificaRgExistente(String rg);
   	
   	@Query("select p from pessoa p where p.email = ?1")
	 Pessoa verificaEmailExistente(String email);
	
}
