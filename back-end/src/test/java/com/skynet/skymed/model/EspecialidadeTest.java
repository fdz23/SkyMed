package com.skynet.skymed.model;

import static org.junit.Assert.*;

import org.junit.Before;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.Assert;
import org.junit.jupiter.api.Test;

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
			esp.setNome(null);
			Assert.fail();
		} catch (Exception e) {
			assertNotNull(e);
		}
		
	}
	
	@Test
	public void testSetNomeVazio() {
		
		try {
			esp.setNome("");
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