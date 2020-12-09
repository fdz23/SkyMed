package com.skynet.skymed.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.sun.istack.NotNull;

@Entity(name = "usuario")
public class Usuario {

	@Id
	@Column(name = "usu_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
	@Column(name = "usu_email")
	private String email;
	@NotNull
	@Column(name = "usu_senha")
	private String senha;

	@Column(name = "usu_token_autenticacao")
	private String tokenAutenticacao;

	@Column(name = "usu_token_autenticacao_email")
	private String tokenAutenticacaoEmail;

	@Column(name = "usu_token_redefinicao_senha")
	private String tokenRedefinicaoSenha;

	@Column(name = "usu_eh_admin")
	private boolean ehAdmin;

	@Column(name = "usu_eh_medico")
	private boolean ehMedico;

	@Column(name = "usu_eh_hospital")
	private boolean ehHospital;

	@Column(name = "usu_eh_paciente")
	private boolean ehPaciente;

	@Column(name = "usu_eh_autenticado")
	private boolean ehAutenticado;
	
	private String novaSenha;

	public boolean getEhAutenticado() {
		return ehAutenticado;
	}

	public void setEhAutenticado(boolean ehAutenticado) {
		this.ehAutenticado = ehAutenticado;
	}

	public String getTokenRedefinicaoSenha() {
		return tokenRedefinicaoSenha;
	}

	public void setTokenRedefinicaoSenha(String tokenRedefinicaoSenha) {
		this.tokenRedefinicaoSenha = tokenRedefinicaoSenha;
	}

	public String getTokenAutenticacaoEmail() {
		return tokenAutenticacaoEmail;
	}

	public void setTokenAutenticacaoEmail(String tokeAutenticacaoEmail) {
		this.tokenAutenticacaoEmail = tokeAutenticacaoEmail;
	}

	public void setEhMedico(boolean medico) {
		this.ehMedico = medico;
	}

	public void setEhAdmin(boolean admin) {
		this.ehAdmin = admin;
	}

	public String getEmail() {
		return email;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getTokenAutenticacao() {
		return tokenAutenticacao;
	}

	public void setTokenAutenticacao(String tokenAutenticacao) {
		this.tokenAutenticacao = tokenAutenticacao;
	}

	public boolean getEhHospital() {
		return ehHospital;
	}

	public void setEhHospital(boolean ehHospital) {
		this.ehHospital = ehHospital;
	}

	public boolean getEhAdmin() {
		return ehAdmin;
	}

	public boolean getEhMedico() {
		return ehMedico;
	}

	public void setEhPaciente(boolean ehPaciente) {
		this.ehPaciente = ehPaciente;
	}

	public boolean getEhPaciente() {
		return ehPaciente;
	}

	public String getNovaSenha() {
		return novaSenha;
	}

	public void setNovaSenha(String novaSenha) {
		this.novaSenha = novaSenha;
	}
}
