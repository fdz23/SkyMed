package com.skynet.Skymed.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

		try {

			return (ArrayList<Pessoa>) pessoaDB.objectListing();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	@PostMapping
	@Override
	public void postAndPutObject(Pessoa object) {
		// TODO Auto-generated method stub

	}

	@DeleteMapping
	@Override
	public void deleteObject(@PathVariable("id") Integer id) {
		// TODO Auto-generated method stub

	}

	@GetMapping("/{id}")
	@Override
	public Pessoa getById(@PathVariable("id") Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

 
}
