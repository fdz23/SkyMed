package com.skynet.skymed.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Especialidade {
	
	@Id
	@Column(name = "esp_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "esp_nome")
	private String nome;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) throws Exception {
		if (nome == null) {
			throw new Exception("Especialidade inválida.");
		}
		if (nome.isEmpty() || nome.length() < 5) {
			throw new Exception("Especialidade inválida.");
		}
		this.nome = nome;
	}

	
	

}
