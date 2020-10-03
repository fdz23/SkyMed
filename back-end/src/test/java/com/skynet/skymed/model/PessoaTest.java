package com.skynet.skymed.model;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PessoaTest {

	private Pessoa pessoa;

	@Before
	public void setUp() throws Exception {

		pessoa = inicializarPessoa();

	}

	private Pessoa inicializarPessoa() throws Exception {

		var pessoa = new Pessoa();
		var endereco = new Endereco();

		endereco.setCep("74922-740");
		endereco.setComplemento("Qd 127 Lt. 9");
		endereco.setIBGE("12345");
		endereco.setLocalidade("Aparecida de Goiânia");
		endereco.setLogradouro("Rua X 29C");
		endereco.setNumero("23");
		endereco.setUf("GO");

		pessoa.setNome("Raphael Mota");
		pessoa.setEmail("raphael.mota14@hotmail.com");
		pessoa.setEhPaciente(true);
		pessoa.setSenha("1234");
		pessoa.setTelefone("(62) 9272-5598");
		pessoa.setRg("5946186");
		pessoa.setEndereco(endereco);
		pessoa.setCpf_cnpj("707.772.711-41");
		pessoa.setTokenDeAutenticacao("1234");
		pessoa.setTokenDeRedefinicao("1244");

		return pessoa;
	}

	@Test
	public void InsereCamposInvalidos() {

		try {
			pessoa.setCpf_cnpj(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf_cnpj("           ");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf_cnpj("aaa.aaa.aaa-aa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf_cnpj("00000000000");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf_cnpj("              ");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf_cnpj("00000000000000");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf_cnpj("000.000.000/000-00");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf_cnpj("aaa.aaa.aaa/aaa-aa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setNome("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setNome(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setNome("aaaa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setRg("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setRg(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setRg("aaaaa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone("62 998540164");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone("62 99854-0164");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone("(62 998540164");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone("62) 998540164");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone("(62)99854-0164");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setEmail("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setEmail(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setEmail("aaaaaaa@aaaaa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setEmail("@sfaer.com");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setEmail("      ");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setEndereco(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

	}
}