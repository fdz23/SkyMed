package com.skynet.skymed.model;

import static org.junit.Assert.*;
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
		
		endereco.setCep("74520-110");
		endereco.setComplemento("Qd. 5-i Lt. 5");
		endereco.setIBGE("12345");
		endereco.setLocalidade("Goiânia");
		endereco.setLogradouro("Av. Perimetral");
		endereco.setNumero("23");
		endereco.setUf("GO");
		
		medico.setCpf_cnpj("064.240.911-06");
		medico.setEhPaciente(false);
		medico.setEmail("ferdavid_9@hotmail.com");
		medico.setEndereco(endereco);
		medico.setNome("Fernando David");
		medico.setRegistro("1234");
		medico.setRg("6349-622");
		medico.setTelefone("(62) 99854-0164");
		
		return medico;
	}

	@Test
	void insereCamposInvalidos() {
		try {
			medico.setCpf_cnpj(null);
		} catch (Exception e) {
			assertNotNull(e);
		}
		
		try {
			medico.setCpf_cnpj("           ");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setCpf_cnpj("aaa.aaa.aaa-aa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setCpf_cnpj("00000000000");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setCpf_cnpj("              ");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setCpf_cnpj("00000000000000");
		} catch (Exception e) {
			assertNotNull(e);
		}
		
		try {
			medico.setCpf_cnpj("000.000.000/000-00");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setCpf_cnpj("aaa.aaa.aaa/aaa-aa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setNome("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setNome(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setNome("aaaa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setRegistro("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setRegistro(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setRegistro("aaaa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setRg("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setRg(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setRg("aaaaa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setTelefone("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setTelefone(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setTelefone("62 998540164");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setTelefone("62 99854-0164");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setTelefone("(62 998540164");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setTelefone("62) 998540164");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setTelefone("(62)99854-0164");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setEmail("");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setEmail(null);
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setEmail("aaaaaaa@aaaaa");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setEmail("@sfaer.com");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setEmail("      ");
		} catch (Exception e) {
			assertNotNull(e);
		}

		try {
			medico.setEndereco(null);
		} catch (Exception e) {
			assertNotNull(e);
		}
	}
}
