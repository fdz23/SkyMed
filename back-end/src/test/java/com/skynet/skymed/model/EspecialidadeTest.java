package com.skynet.skymed.model;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.Assert;

@SpringBootTest
public class EspecialidadeTest {
	
	private Especialidade esp;

	@Before
	public void setUp() throws Exception {
		esp = iniciarEspecialidade();
		
		
	}
	
	private Especialidade iniciarEspecialidade() throws Exception {
		
		var especialidade = new Especialidade();
		
		especialidade.setNome("Epidemiologia");
		
		return especialidade;
		
	}

	@Test
	public void testSetNomeNull() {
		
		try {
			esp.setNome("null");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}
		
	}
	
	@Test
	public void testSetNomeVazio() {
		
		try {
			esp.setNome("      ");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}
		
	}
	
	@Test
	public void testSetNomePontuacao() {
		
		try {
			esp.setNome("e.s.p.e.c.i.a.l.i.d.a.d.e.");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}
		
	}
	
	@Test
	public void testSetNomeNumero() {
		
		try {
			esp.setNome("1234567890");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}
		
	}
	@Test
	public void testSetNomeMenosDe5() {
		
		try {
			esp.setNome("abcd");
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}
		
	}

}