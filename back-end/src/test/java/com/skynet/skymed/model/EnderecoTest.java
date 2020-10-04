package com.skynet.skymed.model;

import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import org.junit.Before;

@SpringBootTest
class EnderecoTest {

	private Endereco endereco;

	@Before
	public void setUp() throws Exception {
		endereco = inicializarEndereco();
	}

	private Endereco inicializarEndereco() throws Exception {
		var endereco = new Endereco();

		endereco.setCep("74520-110");
		endereco.setComplemento("Qd. 5-i Lt. 5");
		endereco.setIBGE("12345");
		endereco.setLocalidade("Goiânia");
		endereco.setLogradouro("Av. Perimetral");
		endereco.setNumero("23");
		endereco.setUf("GO");

		return endereco;
	}

	@Test
	void insereCamposInvalidos() {
		try {
			endereco.setCep(null);
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setCep("     -   ");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setCep("aaaaa-aaa");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setCep("0000-000");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setCep("00000-00");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setCep("00000000");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setIBGE(null);
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setIBGE("");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setIBGE(null);
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setLogradouro("");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setLogradouro(null);
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setLocalidade("");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setLocalidade(null);
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setComplemento("");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setComplemento(null);
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setNumero("");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setNumero(null);
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setNumero("a");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setUf("");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setUf(null);
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setUf("a");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setUf("aaa");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}
	}
}
