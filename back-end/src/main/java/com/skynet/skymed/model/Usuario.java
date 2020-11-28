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
	private String token_autenticacao;

	@Column(name = "usu_token_redefinicao")
	private String token_redefinicao;

	@Column(name = "usu_eh_admin")
	private boolean ehAdmin;

	@Column(name = "usu_eh_medico")
	private boolean ehMedico;
	
	@Column(name = "usu_eh_hospital")
	private boolean ehHospital;
	
	@Column(name = "usu_eh_paciente")
	private boolean ehPaciente;
	
	public String getToken_redefinicao() {
		return token_redefinicao;
	}

	public void setToken_redefinicao(String token_redefinicao) {
		this.token_redefinicao = token_redefinicao;
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

	public String getToken_autenticacao() {
		return token_autenticacao;
	}

	public void setToken_autenticacao(String token_autenticacao) {
		this.token_autenticacao = token_autenticacao;
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

}
