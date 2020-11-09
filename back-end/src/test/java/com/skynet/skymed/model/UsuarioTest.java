package com.skynet.skymed.model;

import org.junit.Before;

import org.junit.jupiter.api.Test;

import org.junit.Assert;

import static org.junit.Assert.*;

class UsuarioTest {

	private Usuario usuario;

	@Before
	void setUp() throws Exception {

		usuario = inicializarUsuario();

	}

	private Usuario inicializarUsuario() throws Exception {

		var usuario = new Usuario();

		usuario.setEhAdmin(false);
		usuario.setEmail("raphael.mota14@hotmail.com");
		usuario.setEhMedico(false);
		usuario.setSenha("1234");

		return usuario;

	}

	@Test
	void insereCamposInvalidos() {

		try {

			usuario.setEmail("");
			Assert.fail();

		} catch (Exception e) {
			assertNotNull(e);
		}

		try {

			usuario.setEmail("aaaaa");
			Assert.fail();

		} catch (Exception e) {
			assertNotNull(e);
		}
		try {

			usuario.setEmail("");
			Assert.fail();

		} catch (Exception e) {
			assertNotNull(e);
		}
		try {

			usuario.setSenha("");
			Assert.fail();

		} catch (Exception e) {
			assertNotNull(e);
		}
		try {

			usuario.setEmail(null);
			Assert.fail();

		} catch (Exception e) {
			assertNotNull(e);
		}

	}

}
