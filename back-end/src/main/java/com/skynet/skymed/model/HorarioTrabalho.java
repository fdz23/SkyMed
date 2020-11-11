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
import com.skynet.skymed.util.EnumeradorDiaDaSemana;

@Entity
public class HorarioTrabalho {

	@Id
	@Column(name = "hot_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "hot_inicio")
	private Date inicio;

	@Column(name = "hot_fim")
	private Date fim;
	
	@Column(name = "hot_dia_da_semana")
	private EnumeradorDiaDaSemana diaDaSemana;

	@ManyToOne
	@JoinColumn(name = "hot_med_iden")
    @JsonBackReference
	private Medico medico;

	public HorarioTrabalho() {
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

	public int getDiaDaSemana() {
		return diaDaSemana.ordinal();
	}

	public void setDiaDaSemana(EnumeradorDiaDaSemana diaDaSemana) {
		this.diaDaSemana = diaDaSemana;
	}
}
