package com.skynet.skymed.model;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.skynet.skymed.util.Validadores;

@Entity
public class Medico {

	@Id
	@Column(name = "med_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "med_nome")
	private String nome;
	@Column(name = "med_cpf_cnpj")
	private String cpf_cnpj;
	@Column(name = "med_registro")
	private String registro;
	@Column(name = "med_rg")
	private String rg;
	@Column(name = "med_telefone")
	private String telefone;
	@Column(name = "med_email")
	private String email;
	@Column(name = "med_senha")
	private String senha;
	@Column(name = "med_eh_paciente")
	private boolean ehPaciente;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "med_end_iden")
	private Endereco endereco;

	public Medico() {
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

	public void setNome(String nome) throws Exception {
		if (nome == null) {
			throw new Exception("Nome inválido.");
		}
		if (nome.isEmpty() || nome.length() < 5) {
			throw new Exception("Nome inválido.");
		}
		this.nome = nome;
	}
	
	public String getRegistro() {
		return registro;
	}

	public void setRegistro(String registro) throws Exception {
		if (registro == null) {
			throw new Exception("Registro inválido.");
		}
		if (registro.isEmpty() || registro.length() < 5) {
			throw new Exception("Registro inválido.");
		}
		this.registro = registro;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) throws Exception {
		if (rg == null) {
			throw new Exception("RG inválido.");
		}
		if (rg.isEmpty() || rg.length() < 6) {
			throw new Exception("RG inválido.");
		}
		this.rg = rg;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) throws Exception {
		if (!Validadores.celularEhValido(telefone)) {
			throw new Exception("Telefone inválido.");
		}
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) throws Exception {
		if (!Validadores.emailEhValido(email)) {
			throw new Exception("E-mail não é valido.");
		}

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

	public void setCpf_cnpj(String cpf_cnpj) throws Exception {
		if (!Validadores.cpfCnpjEhValido(cpf_cnpj)) {
			throw new Exception("Cpf/Cnpj não é valido.");
		}
		
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

	public void setEndereco(Endereco endereco) throws Exception {
		if (endereco == null) {
			throw new Exception("Endereço inválido.");
		}
		this.endereco = endereco;
	}

}
