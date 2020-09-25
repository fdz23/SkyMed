package com.skynet.skymed.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skynet.skymed.interfaces.IController;
import com.skynet.skymed.model.Medico;
import com.skynet.skymed.repository.MedicoRepository;

@RestController

@RequestMapping("/medico")
public class MedicoController implements IController<Medico> {

	@Autowired
	private MedicoRepository medicoDB;

	@GetMapping
	@Override
	public ArrayList<Medico> getObject() {
		return (ArrayList<Medico>) medicoDB.findAll();
	}

	@PostMapping
	@Override
	public void postAndPutObject(@RequestBody Medico object) {
		medicoDB.save(object);
	}

	@DeleteMapping("/{id}")
	@Override
	public void deleteObject(@PathVariable("id") Integer id) {
		medicoDB.deleteById((long)id);
	}

	@GetMapping("/{id}")
	@Override
	public Medico getById(@PathVariable("id") Integer id) {
		return medicoDB.getOne((long)id);
	}

 
}
