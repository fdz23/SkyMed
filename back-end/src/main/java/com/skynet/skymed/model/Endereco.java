package com.skynet.skymed.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.skynet.skymed.util.Validadores;

@Entity
public class Endereco {

	@Id
	@Column(name = "end_iden")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "end_ibge")
	private String ibge;
	@Column(name = "end_logradouro")
	private String logradouro;
	@Column(name = "end_complemento")
	private String complemento;
	@Column(name = "end_numero")
	private String numero;
	@Column(name = "end_cep")
	private String cep;
	@Column(name = "end_uf")
	private String uf;
	@Column(name = "end_localidade")
	private String localidade;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIBGE() {
		return ibge;
	}

	public void setIBGE(String ibge) throws Exception {
		if (ibge == null) {
			throw new Exception("Código IBGE inválido.");
		}
		if (ibge.isEmpty()) {
			throw new Exception("Código IBGE inválido.");
		}
		this.ibge = ibge;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) throws Exception {
		if (logradouro == null) {
			throw new Exception("Logradouro inválido.");
		}
		if (logradouro.isEmpty()) {
			throw new Exception("Logradouro inválido.");
		}
		this.logradouro = logradouro;
	}

	public String getLocalidade() {
		return localidade;
	}

	public void setLocalidade(String localidade) throws Exception {
		if (localidade == null) {
			throw new Exception("Localidade inválido.");
		}
		if (localidade.isEmpty()) {
			throw new Exception("Localidade inválido.");
		}
		this.localidade = localidade;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) throws Exception {
		if (complemento == null) {
			throw new Exception("Complemento inválido.");
		}
		if (complemento.isEmpty()) {
			throw new Exception("Complemento inválido.");
		}
		this.complemento = complemento;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) throws Exception {
		if (numero == null) {
			throw new Exception("Numero inválido.");
		}
		if (numero.isEmpty()) {
			throw new Exception("Numero inválido.");
		}

		Integer.getInteger(numero);

		this.numero = numero;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) throws Exception {
		if (!Validadores.cepEhValido(cep)) {
			throw new Exception("CEP inválido.");
		}

		this.cep = cep;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) throws Exception {
		if (uf == null) {
			throw new Exception("UF inválido.");
		}
		if (uf.isEmpty() || uf.length() != 2) {
			throw new Exception("UF inválido.");
		}
		this.uf = uf;
	}

}
