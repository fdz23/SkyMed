package com.skynet.skymed.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "pes_end_iden")
	private Endereco endereco;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "pes_usu_iden")
	private Usuario usuario;
	
	@OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL)
	private List<Horario> horariosConsulta;
 

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
 

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
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
