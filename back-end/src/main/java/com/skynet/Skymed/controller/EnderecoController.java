package com.skynet.Skymed.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skynet.Skymed.interfaces.IController;
import com.skynet.Skymed.model.Endereco;
import com.skynet.Skymed.repository.EnderecoRepository;

@RestController

@RequestMapping("/endereco")
public class EnderecoController implements IController<Endereco> {

	@Autowired
	private EnderecoRepository enderecoDB;

	@GetMapping
	@Override
	public ArrayList<Endereco> getObject() {
		return (ArrayList<Endereco>) enderecoDB.findAll();
	}

	@PostMapping
	@Override
	public void postAndPutObject(@RequestBody Endereco object) {
		enderecoDB.save(object);
	}

	@DeleteMapping("/{id}")
	@Override
	public void deleteObject(@PathVariable("id") Integer id) {
		enderecoDB.deleteById((long)id);
	}

	@GetMapping("/{id}")
	@Override
	public Endereco getById(@PathVariable("id") Integer id) {
		return enderecoDB.getOne((long)id);
	}

 
}
