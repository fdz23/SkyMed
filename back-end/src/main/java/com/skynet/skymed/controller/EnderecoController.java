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

import com.skynet.skymed.model.Endereco;
import com.skynet.skymed.repository.EnderecoRepository;

@RestController

@RequestMapping("/endereco")
public class EnderecoController {

	@Autowired
	private EnderecoRepository enderecoDB;

	@GetMapping
	public ResponseEntity<ArrayList<Endereco>> getObject() {
		var enderecos = enderecoDB.findAll();
		
		if (enderecos.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.ok((ArrayList<Endereco>) enderecos);
	}

	@PostMapping
	public ResponseEntity<Endereco> postEndereco(@RequestBody Endereco object) {
		if (object.getId() != null) {
			var endereco = getById(object.getId().intValue());
			
			if (endereco.hasBody()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
			}
		}
		
		enderecoDB.save(object);
			
		return ResponseEntity.ok(object);
	}
	
	@PutMapping
	public ResponseEntity<Endereco> putEndereco(@RequestBody Endereco object) {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		
		var endereco = getById(object.getId().intValue());
		
		if (!endereco.hasBody()) {
			return endereco;
		}
		
		enderecoDB.save(object);
			
		return ResponseEntity.ok(object);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Endereco> deleteMedico(@PathVariable("id") Integer id) {
		var endereco = getById(id);
		
		if (!endereco.hasBody()) {
			return endereco;
		}
		
		enderecoDB.deleteById((long) id);
		
		return endereco;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Endereco> getById(@PathVariable("id") Integer id) {
		try {
			var endereco = enderecoDB.findById((long) id);
			
			return ResponseEntity.ok(endereco.get());
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
