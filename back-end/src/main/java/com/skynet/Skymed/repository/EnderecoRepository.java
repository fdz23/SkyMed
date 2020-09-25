package com.skynet.Skymed.repository;

import org.springframework.stereotype.Repository;

import com.skynet.Skymed.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

}
