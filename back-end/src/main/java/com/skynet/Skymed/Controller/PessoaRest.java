package com.skynet.Skymed.Controller;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skynet.Skymed.dao.PacienteDao;
import com.skynet.Skymed.interfaces.IRest;

@RestController

@RequestMapping("/paciente")
public class PessoaRest implements IRest {

	@Autowired
	private PacienteDao pacienteDB;

	@GetMapping
	@Override
	public ArrayList<Object> getObject() {

		try {

			return (ArrayList<Object>) pacienteDB.objectListing();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	@PostMapping
	@Override
	public void postAndPutObject(Object object) {
		// TODO Auto-generated method stub

	}

	@DeleteMapping
	@Override
	public void deleteObject(@PathVariable("id") Integer id) {
		// TODO Auto-generated method stub

	}

	@GetMapping("/{id}")
	@Override
	public Object getObjectId(@PathVariable("id") Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

}
