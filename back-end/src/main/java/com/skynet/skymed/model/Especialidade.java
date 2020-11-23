package com.skynet.skymed.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.JoinColumn;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Especialidade {

	@Id
	@Column(name = "esp_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "esp_nome")
	private String nome;
	@Column(name = "esp_preco")
	private double preco;
	@Column(name = "esp_duracao_Consulta")
	private Date duracaoConsulta;
	
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
		this.nome = nome;
	}

	public String getNome() {
		return nome;
	}

	public double getPreco() {
		return preco;
	}

	public void setPreco(double preco) throws Exception{
		
		if(preco >= 50000.00 || preco <= 0.00) {
			throw new Exception("Preço de consulta ínvalido");
		}
		this.preco = preco;
	}

	public Date getDuracaoConsulta() {
		return duracaoConsulta;
	}

	public void setDuracaoConsulta(Date duracaoConsulta)throws Exception{
		if(duracaoConsulta == null) {
			throw new Exception("Tempo de duração de consulta ínvalido");
		}
		this.duracaoConsulta = duracaoConsulta;
	}
	
	
}
