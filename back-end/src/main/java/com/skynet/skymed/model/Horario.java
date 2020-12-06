package com.skynet.skymed.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Horario {

	@Id
	@Column(name = "hor_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "hor_inicio")
	private Date inicio;

	@Column(name = "hor_fim")
	private Date fim;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "hor_med_iden")
    @JsonBackReference(value = "medico")
	private Medico medico;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "hor_pac_iden")
	private Pessoa paciente;

	public Horario() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getInicio() {
		return inicio;
	}

	public void setInicio(Date inicio) throws Exception {
		if (inicio == null) {
			throw new Exception("Data de início inválida.");
		}
		
		this.inicio = inicio;
	}

	public Date getFim() {
		return fim;
	}

	public void setFim(Date fim) throws Exception {
		if (fim == null) {
			throw new Exception("Data de fim inválida.");
		}
		
		this.fim = fim;
	}

	public Medico getMedico() {
		return medico;
	}

	public void setMedico(Medico medico) throws Exception {
		if (medico == null) {
			throw new Exception("Médico inválido.");
		}
		
		this.medico = medico;
	}

	public Pessoa getPaciente() {
		return paciente;
	}

	public void setPaciente(Pessoa paciente) throws Exception {
		if (paciente == null) {
			throw new Exception("Paciente inválido.");
		}
		
		this.paciente = paciente;
	}
}
