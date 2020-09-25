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
import com.skynet.Skymed.model.Pessoa;
import com.skynet.Skymed.repository.PessoaRepository;
 

@RestController

@RequestMapping("/pessoa")
public class PessoaController implements IController<Pessoa> {

	@Autowired
	private PessoaRepository pessoaDB;

	@GetMapping
	@Override
	public ArrayList<Pessoa> getObject() {
		return (ArrayList<Pessoa>) pessoaDB.findAll();
	}

	@PostMapping
	@Override
	public void postAndPutObject(@RequestBody Pessoa object) {
		pessoaDB.save(object);
	}

	@DeleteMapping("/{id}")
	@Override
	public void deleteObject(@PathVariable("id") Integer id) {
		pessoaDB.deleteById((long)id);
	}

	@GetMapping("/{id}")
	@Override
	public Pessoa getById(@PathVariable("id") Integer id) {
		return pessoaDB.getOne((long)id);
	}

 
}
