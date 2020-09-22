package com.skynet.Skymed.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Pessoa {

	@Id
	@Column(name = "pes_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "pes_nome")
	private String nome;
	@Column(name = "pes_cpf_cnpj")
	private String cpf_cnpj;
	@Column(name = "pes_rg")
	private String rg;
	@Column(name = "pes_telefone")
	private String telefone;
	@Column(name = "pes_email")
	private String email;
	@Column(name = "pes_senha")
	private String senha;
	@Column(name = "pes_tipo_cliente")
	private boolean tipo_cliente;
	@OneToOne
	@JoinColumn(name = "pes_end_iden")
	private Endereco endereco;

	public Pessoa() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpg_cnpj() {
		return cpf_cnpj;
	}

	public void setCpg_cnpj(String cpg_cnpj) {
		this.cpf_cnpj = cpg_cnpj;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public boolean isTipo_cliente() {
		return tipo_cliente;
	}

	public void setTipo_cliente(boolean tipo_cliente) {
		this.tipo_cliente = tipo_cliente;
	}

	/*
	 * public ArrayList<Endereco> getEnderecos() { return enderecos; }
	 * 
	 * 
	 * 
	 * 
	 * public void setEnderecos(ArrayList<Endereco> enderecos) { this.enderecos =
	 * enderecos; }
	 */

}
