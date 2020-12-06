package com.skynet.skymed.model;

import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import org.junit.Before;

@SpringBootTest
class MedicoTest {

	private Medico medico;

	@Before
	public void setUp() throws Exception {
		medico = inicializarMedico();
	}
	
	private Medico inicializarMedico() throws Exception {
		var medico = new Medico();
		var endereco = new Endereco();
		var pessoa = new Pessoa();
		
		endereco.setCep("74520-110");
		endereco.setComplemento("Qd. 5-i Lt. 5");
		endereco.setIBGE("12345");
		endereco.setLocalidade("Goiânia");
		endereco.setLogradouro("Av. Perimetral");
		endereco.setNumero("23");
		endereco.setUf("GO");
		
		pessoa.setCpf("064.240.911-06");
		pessoa.getUsuario().setEmail("ferdavid_9@hotmail.com");
		pessoa.setNome("Fernando David");
		pessoa.setRg("6349-622");
		pessoa.setTelefone("(62) 99854-0164");

		medico.setRegistro("1234");
		medico.setPessoa(pessoa);
		pessoa.setEndereco(endereco);
		
		return medico;
	}

	@Test
	void insereCamposInvalidos() {
		try {
			medico.setRegistro("");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setRegistro(null);
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setRegistro("aaaa");
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}
		
		try {
			medico.setPessoa(null);
			
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}
	}
}
