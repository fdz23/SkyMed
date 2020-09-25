package com.skynet.Skymed.repository;

import org.springframework.stereotype.Repository;

import com.skynet.Skymed.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {

}
