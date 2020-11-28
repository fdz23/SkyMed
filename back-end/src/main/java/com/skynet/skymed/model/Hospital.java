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

@Entity
public class Hospital {

	@Id
	@Column(name = "hos_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "hos_razao_social")
	private String razaoSocial;

	@Column(name = "hos_cnpj")
	private String cnpj;
	
	@OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL)
	private List<Medico> medicos;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "hos_pes_iden")
	private Pessoa pessoa;

	public Hospital() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRazaoSocial() {
		return razaoSocial;
	}

	public void setRazaoSocial(String razaoSocial) throws Exception {
		if (razaoSocial == null) {
			throw new Exception("Razão Social inválida.");
		}
		if (razaoSocial.isEmpty() || razaoSocial.length() < 5) {
			throw new Exception("Razão Social inválida.");
		}
		this.razaoSocial = razaoSocial;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) throws Exception {
		if (!Validadores.isValidCNPJ(cnpj)) {
			throw new Exception("Cnpj não é valido.");
		}

		this.cnpj = cnpj;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) throws Exception {
		if (pessoa == null) {
			throw new Exception("Pessoa inválido.");
		}
		this.pessoa = pessoa;
	}

	public List<Medico> getMedicos() {
		return medicos;
	}

	public void setMedicos(List<Medico> medicos) {
		this.medicos = medicos;
	}
}
