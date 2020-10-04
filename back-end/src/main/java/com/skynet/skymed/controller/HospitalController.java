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

import com.skynet.skymed.model.Hospital;
import com.skynet.skymed.repository.HospitalRepository;

@RestController

@RequestMapping("/hospital")
public class HospitalController {

	@Autowired
	private HospitalRepository hospitalDB;

	@GetMapping
	public ResponseEntity<ArrayList<Hospital>> getObject() {
		var hospitais = hospitalDB.findAll();
		
		if (hospitais.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.ok((ArrayList<Hospital>) hospitais);
	}

	@PostMapping
	public ResponseEntity<Hospital> postHospital(@RequestBody Hospital object) {
		if (object.getId() != null) {
			var hospital = getById(object.getId().intValue());
			
			if (hospital.hasBody()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
			}
		}
		
		hospitalDB.save(object);
			
		return ResponseEntity.ok(object);
	}
	
	@PutMapping
	public ResponseEntity<Hospital> putHospital(@RequestBody Hospital object) {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		
		var hospital = getById(object.getId().intValue());
		
		if (!hospital.hasBody()) {
			return hospital;
		}
		
		hospitalDB.save(object);
			
		return ResponseEntity.ok(object);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Hospital> deleteHospital(@PathVariable("id") Integer id) {
		var hospital = getById(id);
		
		if (!hospital.hasBody()) {
			return hospital;
		}
		
		hospitalDB.deleteById((long) id);
		
		return hospital;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Hospital> getById(@PathVariable("id") Integer id) {
		try {
			var hospital = hospitalDB.findById((long) id);
			
			return ResponseEntity.ok(hospital.get());
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
