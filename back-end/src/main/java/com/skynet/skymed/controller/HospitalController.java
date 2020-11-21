package com.skynet.skymed.controller;

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

import com.skynet.skymed.model.Hospital;
import com.skynet.skymed.repository.HospitalRepository;
import com.skynet.skymed.service.ValidacaoPessoaService;

@RestController

@RequestMapping("/hospital")
public class HospitalController {
	private final String HOSPITAL_INEXISTENTE = "Hospital inexistente.";
	private final ValidacaoPessoaService validacaoPessoa = new ValidacaoPessoaService();

	@Autowired
	private HospitalRepository hospitalDB;
	
	@ExceptionHandler({ HttpMessageNotReadableException.class })
    public ResponseEntity<Object> handleException(HttpMessageNotReadableException ex) {
		return ResponseEntity.badRequest().body(ex.getMostSpecificCause().getMessage());
    }

	@GetMapping
	public ResponseEntity<Object> getObject() {
		var hospitais = hospitalDB.findAll();
		
		if (hospitais.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi encontrado nenhum hospital.");
		}
		
		return ResponseEntity.ok(hospitais);
	}

	@PostMapping
	public ResponseEntity<Object> postHospital(@RequestBody Hospital object) {
		if (object.getId() != null) {
			var hospital = getById(object.getId().intValue());
			
			if (!hospital.getBody().equals(HOSPITAL_INEXISTENTE)) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hospital existente.");
			}
		}
		
		var validacao = validacaoPessoa.valideInsercao(object.getPessoa());
		
		if (validacao != null) {
			return validacao;
		}
		
		hospitalDB.save(object);
			
		return ResponseEntity.ok(object);
	}
	
	@PutMapping
	public ResponseEntity<Object> putHospital(@RequestBody Hospital object) {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id inválido.");
		}
		
		var hospital = getById(object.getId().intValue());
		
		if (hospital.getBody().equals(HOSPITAL_INEXISTENTE)) {
			return hospital;
		}
		
		var validacao = validacaoPessoa.valideAtualizacao(object.getPessoa());
		
		if (validacao != null) {
			return validacao;
		}
		
		hospitalDB.save(object);
			
		return ResponseEntity.ok(object);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteHospital(@PathVariable("id") Integer id) {
		var hospital = getById(id);
		
		if (hospital.getBody().equals(HOSPITAL_INEXISTENTE)) {
			return hospital;
		}
		
		hospitalDB.deleteById((long) id);
		
		return ResponseEntity.ok(null);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Integer id) {
		try {
			var hospital = hospitalDB.findById((long) id);
			
			return ResponseEntity.ok(hospital.get());
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(HOSPITAL_INEXISTENTE);
		}
	}
}
