package com.skynet.skymed.controller;

import java.util.ArrayList;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skynet.skymed.model.Pessoa;
import com.skynet.skymed.repository.PessoaRepository;
import com.skynet.skymed.service.EmailDePacienteService;

@RestController

@RequestMapping("/pessoa")
public class PessoaController {

	private EmailDePacienteService servicoDeEmailPaciente = new EmailDePacienteService();

	@Autowired
	private PessoaRepository pessoaDB;

	@GetMapping
	public ResponseEntity<ArrayList<Pessoa>> getObject() {
		var pessoas = pessoaDB.findAll();
		if (pessoas.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

		}
		return ResponseEntity.ok((ArrayList<Pessoa>) pessoas);
	}

	@PostMapping
	public ResponseEntity<Pessoa> postPessoa(@RequestBody Pessoa object) throws Exception {
		if (object.getId() != null) {
			var pessoa = getById(object.getId().intValue());

			if (pessoa.hasBody()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

			}
		}

		servicoDeEmailPaciente.enviaEmail(object);
		pessoaDB.save(object);
		return ResponseEntity.ok(object);

	}

	@PutMapping
	public ResponseEntity<Pessoa> putPessoa(@RequestBody Pessoa object) {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

		var pessoa = getById(object.getId().intValue());

		if (!pessoa.hasBody()) {
			return pessoa;
		}

		pessoaDB.save(object);

		return ResponseEntity.ok(object);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Pessoa> deleteObject(@PathVariable("id") Integer id) {
		var pessoa = getById(id);

		if (!pessoa.hasBody()) {
			return pessoa;
		}

		pessoaDB.deleteById((long) id);

		return pessoa;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Pessoa> getById(@PathVariable("id") Integer id) {
		try {
			var pessoa = pessoaDB.findById((long) id);

			return ResponseEntity.ok(pessoa.get());

		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

}
