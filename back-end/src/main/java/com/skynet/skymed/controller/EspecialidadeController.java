package com.skynet.skymed.controller;

import java.util.ArrayList;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.NestedRuntimeException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
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
	
	@ExceptionHandler({ NestedRuntimeException.class })
    public ResponseEntity<Object> handleException(NestedRuntimeException ex) {
		return ResponseEntity.badRequest().body(ex.getMostSpecificCause().getMessage());
    }

	@GetMapping
	public ResponseEntity<Object> getObject() {
		var especialidades = especialidadeDB.findAll();

		if (especialidades.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi encontrada nenhuma especialidade.");
		}

		return ResponseEntity.ok((ArrayList<Especialidade>) especialidades);
	}

	@PostMapping
	@PreAuthorize("hasRole('HOSPITAL')")
	public ResponseEntity<Object> postEspecialidade(@RequestBody Especialidade object) {
		if (object.getId() != null) {
			var especialidade = getById(object.getId().intValue());

			if (especialidade.hasBody()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
			}
						
		}
		if(especialidadeDB.findByNome(object.getNome()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome existente");
		}

		especialidadeDB.save(object);

		return ResponseEntity.ok(object);
	}

	@PutMapping
	@PreAuthorize("hasRole('HOSPITAL')")
	public ResponseEntity<Object> putEspecialidade(@RequestBody Especialidade object) {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id Invalido");
		}

		var especialidade = getById(object.getId().intValue());

		if (!especialidade.hasBody()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		if(especialidadeDB.findByNome(object.getNome()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome existente");
		}

		especialidadeDB.save(object);

		return ResponseEntity.ok(object);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
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

