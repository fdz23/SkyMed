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

import com.skynet.skymed.model.Especialidade;
import com.skynet.skymed.repository.EspecialidadeRepository;

@RestController

@RequestMapping("/especialidade")
public class EspecialidadeController {

	@Autowired
	private EspecialidadeRepository especialidadeDB;

	@GetMapping
	public ResponseEntity<ArrayList<Especialidade>> getObject() {
		var especialidades = especialidadeDB.findAll();

		if (especialidades.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

		return ResponseEntity.ok((ArrayList<Especialidade>) especialidades);
	}

	@PostMapping
	public ResponseEntity<Especialidade> postEspecialidade(@RequestBody Especialidade object) {
		if (object.getId() != null) {
			var especialidade = getById(object.getId().intValue());

			if (especialidade.hasBody()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
			}
		}

		especialidadeDB.save(object);

		return ResponseEntity.ok(object);
	}

	@PutMapping
	public ResponseEntity<Especialidade> putEspecialidade(@RequestBody Especialidade object) {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

		var especialidade = getById(object.getId().intValue());

		if (!especialidade.hasBody()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

		especialidadeDB.save(object);

		return ResponseEntity.ok(object);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Especialidade> deleteEspecialidade(@PathVariable("id") Integer id) {
		var especialidade = getById(id);

		if (!especialidade.hasBody()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

		especialidadeDB.deleteById((long) id);

		return especialidade;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Especialidade> getById(@PathVariable("id") Integer id) {
		try {
			var especialidade = especialidadeDB.findById((long) id);

			return ResponseEntity.ok(especialidade.get());
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
