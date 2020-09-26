package com.skynet.skymed.model;

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
	@Column(name = "end_ibge")
	private String ibge;
	@Column(name = "end_logradouro")
	private String logradouro;
	@Column(name = "end_complemento")
	private String complemento;
	@Column(name = "end_numero")
	private String numero;
	@Column(name = "end_cep")
	private String cep;
	@Column(name = "end_uf")
	private String uf;
	@Column(name = "end_localidade")
	private String localidade;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIBGE() {
		return ibge;
	}

	public void setIBGE(String ibge) {
		this.ibge = ibge;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getLocalidade() {
		return localidade;
	}

	public void setLocalidade(String localidade) {
		this.localidade = localidade;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
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

}
