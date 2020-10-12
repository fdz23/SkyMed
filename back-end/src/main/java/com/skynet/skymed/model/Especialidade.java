package com.skynet.skymed.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Entity
public class Especialidade {

	@Id
	@Column(name = "esp_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "esp_nome")
	private String nome;
	
	public Especialidade() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setNome(String nome) throws Exception {
		if (nome == null) {
			throw new Exception("Nome inválido.");
		}
		if (nome.isEmpty() || nome.length() < 5) {
			throw new Exception("Nome inválido.");
		}
		else {
			Pattern pattern = Pattern.compile("[0-9]");
			Matcher matcher = pattern.matcher(nome);
			if(matcher.find()){
				throw new Exception("Nome inválido");
			}
			
		}
		this.nome = nome;
	}

	public String getNome() {
		return nome;
	}
}
