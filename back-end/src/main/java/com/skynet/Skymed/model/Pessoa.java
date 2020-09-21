package com.skynet.Skymed.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Pessoa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer pes_id;
	private String pes_nome;
	private String pes_cpg_cnpj;
	private String pes_rg;
	private String pes_telefone;
	private String pes_email;
	private String pes_senha;
	
	@ManyToOne
	@JoinColumn(name="pes_end_id")
	private Endereco pes_end_id;
	private boolean pes_tipo_cliente;
	public Integer getPes_id() {
		return pes_id;
	}
	public void setPes_id(Integer pes_id) {
		this.pes_id = pes_id;
	}
	public String getPes_nome() {
		return pes_nome;
	}
	public void setPes_nome(String pes_nome) {
		this.pes_nome = pes_nome;
	}
	public String getPes_cpg_cnpj() {
		return pes_cpg_cnpj;
	}
	public void setPes_cpg_cnpj(String pes_cpg_cnpj) {
		this.pes_cpg_cnpj = pes_cpg_cnpj;
	}
	public String getPes_rg() {
		return pes_rg;
	}
	public void setPes_rg(String pes_rg) {
		this.pes_rg = pes_rg;
	}
	public String getPes_telefone() {
		return pes_telefone;
	}
	public void setPes_telefone(String pes_telefone) {
		this.pes_telefone = pes_telefone;
	}
	public String getPes_email() {
		return pes_email;
	}
	public void setPes_email(String pes_email) {
		this.pes_email = pes_email;
	}
	public String getPes_senha() {
		return pes_senha;
	}
	public void setPes_senha(String pes_senha) {
		this.pes_senha = pes_senha;
	}
	public Endereco getPes_end_iden() {
		return pes_end_id;
	}
	public void setPes_end_iden(Endereco pes_end_iden) {
		this.pes_end_id = pes_end_iden;
	}
	public boolean isPes_tipo_cliente() {
		return pes_tipo_cliente;
	}
	public void setPes_tipo_cliente(boolean pes_tipo_cliente) {
		this.pes_tipo_cliente = pes_tipo_cliente;
	}
	
	

	

}
