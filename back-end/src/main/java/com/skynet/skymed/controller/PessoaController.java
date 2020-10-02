package com.skynet.skymed.controller;

import java.io.IOException;
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
import com.skynet.skymed.model.Pessoa;
import com.skynet.skymed.repository.PessoaRepository;
import com.skynet.skymed.service.EmailServicePaciente;

@RestController

@RequestMapping("/pessoa")
public class PessoaController implements IController<Pessoa> {

	private EmailServicePaciente servicoDeEmailPaciente = new EmailServicePaciente();

	@Autowired
	private PessoaRepository pessoaDB;

	@GetMapping
	@Override
	public ArrayList<Pessoa> getObject() {
		return (ArrayList<Pessoa>) pessoaDB.findAll();
	}

	@PostMapping
	@Override
	public void postAndPutObject(@RequestBody Pessoa objetoPessoa) {

		try {

			pessoaDB.save(objetoPessoa);

			servicoDeEmailPaciente.enviaEmail(objetoPessoa);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@DeleteMapping("/{id}")
	@Override
	public void deleteObject(@PathVariable("id") Integer id) {
		pessoaDB.deleteById((long) id);
	}

	@GetMapping("/{id}")
	@Override
	public Pessoa getById(@PathVariable("id") Integer id) {
		return pessoaDB.getOne((long) id);
	}

}
