package com.skynet.skymed.model;

import static org.junit.Assert.*;

import org.junit.Assert;
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
		var usuario = new Usuario();

		endereco.setCep("74922-740");
		endereco.setComplemento("Qd 127 Lt. 9");
		endereco.setIBGE("12345");
		endereco.setLocalidade("Aparecida de Goiânia");
		endereco.setLogradouro("Rua X 29C");
		endereco.setNumero("23");
		endereco.setUf("GO");

		usuario.setEhAdmin(false);
		usuario.setEmail("raphael.mota14@hotmail.com");
		usuario.setEhMedico(false);
		usuario.setSenha("1234");

		pessoa.setNome("Raphael Mota");
		pessoa.getUsuario().setEmail("raphael.mota14@hotmail.com");
		pessoa.getUsuario().setSenha("1234");
		pessoa.setTelefone("(62) 9272-5598");
		pessoa.setRg("5946186");
		pessoa.setEndereco(endereco);
		pessoa.setUsuario(usuario);
		pessoa.setCpf("707.772.711-41");
		pessoa.getUsuario().setTokenAutenticacaoEmail("1234");
		pessoa.getUsuario().setTokenRedefinicaoSenha("1244");

		return pessoa;
	}

	@Test
	public void InsereCamposInvalidos() {

		try {
			pessoa.setCpf(null);
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf("           ");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf("aaa.aaa.aaa-aa");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf("00000000000");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf("              ");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf("00000000000000");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf("000.000.000/000-00");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setCpf("aaa.aaa.aaa/aaa-aa");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setNome("");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setNome(null);
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setNome("aaaa");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setRg("");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setRg(null);
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setRg("aaaaa");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone("");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone(null);
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone("62 998540164");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone("62 99854-0164");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setTelefone("(62 998540164");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setUsuario(null);
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			pessoa.setEndereco(null);
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

	}
}