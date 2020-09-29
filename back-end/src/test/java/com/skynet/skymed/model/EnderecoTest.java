package com.skynet.skymed.model;

import static org.junit.Assert.*;
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
		} catch (Exception e) {
			assertNotNull(e);
		}
		
		try {
			endereco.setCep("     -   ");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setCep("aaaaa-aaa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setCep("0000-000");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setCep("00000-00");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setCep("00000000");
		} catch (Exception e) {
			assertNotNull(e);
		}
		
		try {
			endereco.setIBGE(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setIBGE("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setIBGE(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setLogradouro("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setLogradouro(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setLocalidade("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setLocalidade(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setComplemento("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setComplemento(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setNumero("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setNumero(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setNumero("a");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setUf("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setUf(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setUf("a");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			endereco.setUf("aaa");
		} catch (Exception e) {
			assertNotNull(e);
		}
	}
}
