package com.skynet.skymed.controller;

import java.util.ArrayList;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
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
	private final String MEDICO_INEXISTENTE = "Médico inexistente.";

	@Autowired
	private MedicoRepository medicoDB;
	
	@ExceptionHandler({ HttpMessageNotReadableException.class })
    public ResponseEntity<Object> handleException(HttpMessageNotReadableException ex) {
		return ResponseEntity.badRequest().body(ex.getMostSpecificCause().getMessage());
    }

	@GetMapping
	public ResponseEntity<Object> getObject() {
		var medicos = medicoDB.findAll();

		if (medicos.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi encontrado nenhum médico.");
		}

		return ResponseEntity.ok((ArrayList<Medico>) medicos);
	}

	@PostMapping
	public ResponseEntity<Object> postMedico(@RequestBody Medico object) throws Exception {
		if (object.getId() != null) {
			var medico = getById(object.getId().intValue());

			if (!medico.getBody().equals(MEDICO_INEXISTENTE)) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Médico existente.");
			}
		}
		
		if (!object.getHorariosTrabalho().isEmpty()) {
			for (var horario : object.getHorariosTrabalho()) {
				horario.setMedico(object);
			}
		}

		medicoDB.save(object);

		return ResponseEntity.ok(object);
	}

	@PutMapping
	public ResponseEntity<Object> putMedico(@RequestBody Medico object) {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id inválido.");
		}

		var medico = getById(object.getId().intValue());

		if (medico.getBody().equals(MEDICO_INEXISTENTE)) {
			return medico;
		}

		medicoDB.save(object);

		return ResponseEntity.ok(object);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteMedico(@PathVariable("id") Integer id) {
		var medico = getById(id);

		if (medico.getBody().equals(MEDICO_INEXISTENTE)) {
			return medico;
		}

		medicoDB.deleteById((long) id);

		return ResponseEntity.ok(null);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Integer id) {
		try {
			var medico = medicoDB.findById((long) id);

			return ResponseEntity.ok(medico.get());
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(MEDICO_INEXISTENTE);
		}
	}
}
