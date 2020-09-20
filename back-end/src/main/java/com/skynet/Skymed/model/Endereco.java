package com.skynet.Skymed.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

public class Endereco {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long   end_id;
	private String end_cod_ibge;
	private String end_estado;
	private String end_logradouro;
	private String end_complemeto;
	private String end_numero;
	private String end_cep;
	private String end_uf;
	private String end_cidade;
	
	@OneToMany
	private Pessoa pessoas;
	
	
	public Pessoa getPessoas() {
		return pessoas;
	}
	public void setPessoas(Pessoa pessoas) {
		this.pessoas = pessoas;
	}
	public Long getEnd_id() {
		return end_id;
	}
	public void setEnd_id(Long end_id) {
		this.end_id = end_id;
	}
	public String getEnd_cod_ibge() {
		return end_cod_ibge;
	}
	public void setEnd_cod_ibge(String end_cod_ibge) {
		this.end_cod_ibge = end_cod_ibge;
	}
	public String getEnd_estado() {
		return end_estado;
	}
	public void setEnd_estado(String end_estado) {
		this.end_estado = end_estado;
	}
	public String getEnd_logradouro() {
		return end_logradouro;
	}
	public void setEnd_logradouro(String end_logradouro) {
		this.end_logradouro = end_logradouro;
	}
	public String getEnd_complemeto() {
		return end_complemeto;
	}
	public void setEnd_complemeto(String end_complemeto) {
		this.end_complemeto = end_complemeto;
	}
	public String getEnd_numero() {
		return end_numero;
	}
	public void setEnd_numero(String end_numero) {
		this.end_numero = end_numero;
	}
	public String getEnd_cep() {
		return end_cep;
	}
	public void setEnd_cep(String end_cep) {
		this.end_cep = end_cep;
	}
	public String getEnd_uf() {
		return end_uf;
	}
	public void setEnd_uf(String end_uf) {
		this.end_uf = end_uf;
	}
	public String getEnd_cidade() {
		return end_cidade;
	}
	public void setEnd_cidade(String end_cidade) {
		this.end_cidade = end_cidade;
	}
	
	
	
}
