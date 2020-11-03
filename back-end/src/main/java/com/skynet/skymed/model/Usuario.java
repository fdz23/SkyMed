package com.skynet.skymed.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.dom4j.tree.AbstractEntity;

import com.sun.istack.NotNull;

@Entity(name = "usuario")
public class Usuario extends AbstractEntity {

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
	@NotNull
	@Column(name = "usu_token_autenticacao")
	private String token_autenticacao;
	
	@Column(name = "usu_admin")
	private boolean admin;
	
	public boolean isAdmin() {
		return admin;
	}
	public void setAdmin(boolean admin) {
		this.admin = admin;
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
	public String getToken_autenticacao() {
		return token_autenticacao;
	}
	public void setToken_autenticacao(String token_autenticacao) {
		this.token_autenticacao = token_autenticacao;
	}
	
  
	
}
