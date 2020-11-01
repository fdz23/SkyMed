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

import com.skynet.skymed.model.Pessoa;
import com.skynet.skymed.repository.PessoaRepository;
import com.skynet.skymed.service.EmailDePacienteService;

@RestController

@RequestMapping("/pessoa")
public class PessoaController {

	private EmailDePacienteService servicoDeEmailPaciente = new EmailDePacienteService();
	private final String PACIENTE_INEXISTENTE = "Paciente inexistente.";

	@Autowired
	private PessoaRepository pessoaDB;

	@ExceptionHandler({ HttpMessageNotReadableException.class })
	public ResponseEntity<Object> handleException(HttpMessageNotReadableException ex) {
		return ResponseEntity.badRequest().body(ex.getMostSpecificCause().getMessage());
	}

	@GetMapping
	public ResponseEntity<Object> getObject() {
		var pessoas = pessoaDB.findAll();

		if (pessoas == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhuma pessoa encontrada.");
		}
		return ResponseEntity.ok(pessoas);
	}

	@PostMapping
	public ResponseEntity<Object> postPessoa(@RequestBody Pessoa object) throws Exception {
		if (object.getId() != null) {
			var pessoa = getById(object.getId().intValue());

			if (pessoa.getBody().equals("Paciente_INEXISTENTE")) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Paciente existente.");
			}
		} else if (pessoaDB.verificaCpfExistente(object.getCpf()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cpf existente.");

		} else if (pessoaDB.verificaRgExistente(object.getRg()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("RG existente.");

		} else if (pessoaDB.verificaEmailExistente(object.getEmail()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-mail existente.");

		}

		// servicoDeEmailPaciente.enviaEmail(object);
		pessoaDB.save(object);
		return ResponseEntity.ok(object);

	}

	@PutMapping
	public ResponseEntity<Object> putPessoa(@RequestBody Pessoa object) {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID Inválido");
		}

		var pessoa = getById(object.getId().intValue());

		if (pessoa.getBody().equals("PACIENTE_INEXISTENTE")) {

			return pessoa;

		}

		pessoaDB.save(object);

		return ResponseEntity.ok(object);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteObject(@PathVariable("id") Integer id) {
		var pessoa = getById(id);

		if (pessoa.getBody().equals("PESSOA_INEXISTENTE")) {

			return pessoa;
		}

		pessoaDB.deleteById((long) id);

		return ResponseEntity.ok(null);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Integer id) {
		try {
			var pessoa = pessoaDB.findById((long) id);

			return ResponseEntity.ok(pessoa.get());

		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("PACIENTE_INEXISTENTE");
		}
	}

	@GetMapping("/pacientes")
	public ResponseEntity<Object> getPacientes() {
		var pessoas = pessoaDB.findAll();
		if (pessoas.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum paciente encontrado");
		}

		var pacientes = pessoaDB.obtenhaPacientes();

		if (pacientes.equals(null)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum paciente retornado");
		}

		return ResponseEntity.ok(pacientes);
	}

}
