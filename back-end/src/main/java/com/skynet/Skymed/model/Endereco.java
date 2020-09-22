package com.skynet.Skymed.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Endereco {

	@Id
	@Column(name = "end_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "end_cod_ibge")
	private String cod_ibge;
	@Column(name = "end_estado")
	private String estado;
	@Column(name = "end_logradouro")
	private String logradouro;
	@Column(name = "end_complemento")
	private String complemeto;
	@Column(name = "end_numero")
	private String numero;
	@Column(name = "end_cep")
	private String cep;
	@Column(name = "end_uf")
	private String uf;
	@Column(name = "end_cidade")
	private String cidade;

	public String getEstado() {
		return estado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCod_ibge() {
		return cod_ibge;
	}

	public void setCod_ibge(String cod_ibge) {
		this.cod_ibge = cod_ibge;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getlogradouro() {
		return logradouro;
	}

	public void setEnlogradouro(String enlogradouro) {
		this.logradouro = enlogradouro;
	}

	public String getComplemeto() {
		return complemeto;
	}

	public void setComplemeto(String complemeto) {
		this.complemeto = complemeto;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}
	/*
	 * public String getEnd_cidade() { return end_cidade; } public void
	 * setEnd_cidade(String end_cidade) { this.end_cidade = end_cidade; }
	 */

}
