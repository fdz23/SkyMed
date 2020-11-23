package com.skynet.skymed.repository;

import org.springframework.stereotype.Repository;

import com.skynet.skymed.model.Horario;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long> {

}
