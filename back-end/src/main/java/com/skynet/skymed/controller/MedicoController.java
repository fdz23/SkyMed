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
import com.skynet.skymed.model.Medico;
import com.skynet.skymed.repository.MedicoRepository;

@RestController

@RequestMapping("/medico")
public class MedicoController {

	@Autowired
	private MedicoRepository medicoDB;

	@GetMapping
	public ResponseEntity<ArrayList<Medico>> getObject() {
		var medicos = medicoDB.findAll();
		
		if (medicos.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.ok((ArrayList<Medico>) medicos);
	}

	@PostMapping
	public ResponseEntity<Medico> postMedico(@RequestBody Medico object) {
		if (object.getId() != null) {
			var medico = getById(object.getId().intValue());
			
			if (medico.hasBody()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
			}
		}
		
		medicoDB.save(object);
			
		return ResponseEntity.ok(object);
	}
	
	@PutMapping
	public ResponseEntity<Medico> putMedico(@RequestBody Medico object) {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		
		var medico = getById(object.getId().intValue());
		
		if (!medico.hasBody()) {
			return medico;
		}
		
		medicoDB.save(object);
			
		return ResponseEntity.ok(object);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Medico> deleteMedico(@PathVariable("id") Integer id) {
		var medico = getById(id);
		
		if (!medico.hasBody()) {
			return medico;
		}
		
		medicoDB.deleteById((long) id);
		
		return medico;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Medico> getById(@PathVariable("id") Integer id) {
		try {
			var medico = medicoDB.findById((long) id);
			
			return ResponseEntity.ok(medico.get());
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
