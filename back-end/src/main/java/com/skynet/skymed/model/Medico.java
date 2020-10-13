package com.skynet.skymed.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

@Entity
public class Medico {

	@Id
	@Column(name = "med_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "med_registro")
	private String registro;
	
	@ManyToMany()
	@JoinTable(
			  name = "medico_especialidades", 
			  joinColumns = @JoinColumn(name = "med_iden"), 
			  inverseJoinColumns = @JoinColumn(name = "esp_iden"))
	private List<Especialidade> especialidades;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "med_pes_iden")
	private Pessoa pessoa;

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
		return especialidades;
	}

	public void setEspecialidade(Especialidade especialidades) throws Exception {
		if (especialidades == null) {
			throw new Exception("Especialidades inválidas.");
		}
		this.especialidades = especialidades;
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
}
