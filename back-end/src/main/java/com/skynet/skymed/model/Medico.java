package com.skynet.skymed.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Medico {

	@Id
	@Column(name = "med_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "med_registro")
	private String registro;
	
	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "med_esp_iden")
	private Especialidade especialidade;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "med_pes_iden")
	private Pessoa pessoa;
	
	@OneToMany(mappedBy = "medico", cascade = CascadeType.ALL)
	private List<Horario> horariosConsulta;
	
	@OneToMany(mappedBy = "medico", cascade = CascadeType.ALL)
	private List<HorarioTrabalho> horariosTrabalho;
	
	@ManyToOne
	@JoinColumn(name = "med_hos_iden")
    @JsonBackReference
	private Hospital hospital;

	public Medico() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getRegistro() {
		return registro;
	}

	public void setRegistro(String registro) throws Exception {
		if (registro == null) {
			throw new Exception("Registro inválido.");
		}
		if (registro.isEmpty() || registro.length() < 5) {
			throw new Exception("Registro inválido.");
		}
		this.registro = registro;
	}

	public Especialidade getEspecialidade() {
		return especialidade;
	}

	public void setEspecialidade(Especialidade especialidade) throws Exception {
		if (especialidade == null) {
			throw new Exception("Especialidade inválida.");
		}
		this.especialidade = especialidade;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) throws Exception {
		if (pessoa == null) {
			throw new Exception("Pessoa inválido.");
		}
		this.pessoa = pessoa;
	}

	public List<Horario> getHorariosConsulta() {
		return horariosConsulta;
	}

	public void setHorariosConsulta(List<Horario> horariosConsulta) throws Exception {
		if (horariosConsulta == null) {
			throw new Exception("Horários inválidos.");
		}
		
		this.horariosConsulta = horariosConsulta;
	}

	public List<HorarioTrabalho> getHorariosTrabalho() {
		return horariosTrabalho;
	}

	public void setHorariosTrabalho(List<HorarioTrabalho> horariosTrabalho) throws Exception {
		if (horariosTrabalho == null) {
			throw new Exception("Horários inválidos.");
		}
		
		this.horariosTrabalho = horariosTrabalho;
	}

	public Hospital getHospital() {
		return hospital;
	}

	public void setHospital(Hospital hospital) throws Exception {
		if (hospital == null) {
			throw new Exception("Hospital inválido.");
		}
		
		this.hospital = hospital;
	}
	
	
}
