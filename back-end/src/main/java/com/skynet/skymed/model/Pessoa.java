package com.skynet.skymed.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
	@Column(name = "pes_eh_paciente")
	private boolean ehPaciente;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "pes_end_iden")
	private Endereco endereco;
	@JoinColumn(name = "pes_token_autenticacao")
	private String token_autenticacao;
    @JoinColumn(name = "pes_token_redefinicao")
	private String token_redefinicao;

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

	public String getCpf_cnpj() {
		return cpf_cnpj;
	}

	public void setCpf_cnpj(String cpf_cnpj) {
		this.cpf_cnpj = cpf_cnpj;
	}

	public boolean isEhPaciente() {
		return ehPaciente;
	}

	public void setEhPaciente(boolean ehPaciente) {
		this.ehPaciente = ehPaciente;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}
	
	public String getToken_autenticacao() {
		return token_autenticacao;
	}

	public void setToken_autenticacao(String token_autenticacao) {
		this.token_autenticacao = token_autenticacao;
	}

	public String getToken_redefinicao() {
		return token_redefinicao;
	}

	public void setToken_redefinicao(String token_redefinicao) {
		this.token_redefinicao = token_redefinicao;
	}


}
