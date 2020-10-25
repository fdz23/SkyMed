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

@Entity(name = "pessoa")
public class Pessoa {

	@Id
	@Column(name = "pes_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "pes_nome")
	private String nome;
	@Column(name = "pes_cpf")
	private String cpf;
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
	private String tokenDeAutenticacao;
	@JoinColumn(name = "pes_token_redefinicao")
	private String tokenDeRedefinicao;

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

	public void setNome(String nome) throws Exception {
		if (nome == null) {
			throw new Exception("Nome inválido.");
		}
		if (nome.isEmpty() || nome.length() < 5) {
			throw new Exception("Nome inválido.");
		}
		this.nome = nome;
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

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) throws Exception {
		if (!Validadores.isValidCPF(cpf)) {
			throw new Exception("CPF não é valido.");
		}

		this.cpf = cpf;
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

	public String getTokenDeAutenticacao() {
		return tokenDeAutenticacao;
	}

	public void setTokenDeAutenticacao(String tokenDeAutenticacao) throws Exception {
		if (!(tokenDeAutenticacao.length() == 4)) {
			throw new Exception("Token de Auntenticação Inválido");
		}
		this.tokenDeAutenticacao = tokenDeAutenticacao;
	}

	public String getTokenDeRedefinicao() {
		return tokenDeRedefinicao;
	}

	public void setTokenDeRedefinicao(String tokenDeRedefinicao) throws Exception {
		if (!(tokenDeRedefinicao.length() == 4)) {
			throw new Exception("Token de Redefinição Inválido");
		}
		this.tokenDeRedefinicao = tokenDeRedefinicao;
	}

}
