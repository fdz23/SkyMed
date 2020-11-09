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
import org.springframework.security.access.prepost.PreAuthorize;

import com.skynet.skymed.model.Pessoa;
import com.skynet.skymed.repository.PessoaRepository;
import com.skynet.skymed.service.EmailDePacienteService;

@RestController
//@RequestMapping("skymed")
@RequestMapping("pessoa")
public class PessoaController {

	private EmailDePacienteService servicoDeEmailPaciente = new EmailDePacienteService();
	private final String PACIENTE_INEXISTENTE = "Paciente inexistente.";

	@Autowired
	private PessoaRepository pessoaDB;

	@ExceptionHandler({ HttpMessageNotReadableException.class })
	public ResponseEntity<Object> handleException(HttpMessageNotReadableException ex) {
		return ResponseEntity.badRequest().body(ex.getMostSpecificCause().getMessage());
	}

	 @PostMapping//(path = "admin/paciente")
	 //@PreAuthorize("hasRole('ADMIN')")
	 public ResponseEntity<Object> postPessoa(@RequestBody Pessoa object) throws Exception {
		if (object.getId() != null) {
			var pessoa = getById(object.getId().intValue());

			if (pessoa.getBody().equals("Paciente_INEXISTENTE")) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Paciente existente.");
			}
		} else if (pessoaDB.findByCpf(object.getCpf()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cpf existente.");

		} else if (pessoaDB.findByRg(object.getRg()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("RG existente.");

		 } else if (pessoaDB.findByUsuarioEmail(object.getUsuario().getEmail()) != null) {
		 	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-mail existente.");

		}

		 // servicoDeEmailPaciente.enviaEmail(object);
		pessoaDB.save(object);
		return ResponseEntity.ok(object);

	}

	@PutMapping//(path = "admin/paciente")
	//@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> putPessoa(@RequestBody Pessoa object) {
		
		Pessoa pacienteDB = pessoaDB.findByUsuarioEmail(object.getUsuario().getEmail());
		
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID Inválido");
		}

		var pessoa = getById(object.getId().intValue());

		if (pessoa.getBody().equals(PACIENTE_INEXISTENTE)) {

			return pessoa;

		} else if (pacienteDB != null) {
			 if (!pacienteDB.getCpf().contains(object.getCpf())) {
			
				 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-mail existente.");
			 }
		}

		pessoaDB.save(object);
		return ResponseEntity.ok(object);
	}

	//@DeleteMapping(path = "admin/paciente/{id}")
	@DeleteMapping("{id}")
	//@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> deleteObject(@PathVariable("id") Integer id) {
		var pessoa = getById(id);

		if (pessoa.getBody().equals(PACIENTE_INEXISTENTE)) {

			return pessoa;
		}

		pessoaDB.deleteById((long) id);

		return ResponseEntity.ok(null);
	}

	 //@GetMapping(path = "protected/paciente/{id}")
	 @GetMapping("{id}")
	 //@PreAuthorize("hasRole('USER')")
	 public ResponseEntity<Object> getById(@PathVariable("id") Integer id) {
		try {
			var pessoa = pessoaDB.findById((long) id);

			return ResponseEntity.ok(pessoa.get());

		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(PACIENTE_INEXISTENTE);
		}
	}

	 //@GetMapping(path = "admin/paciente")
	 //@PreAuthorize("hasRole('ADMIN')")
	 @GetMapping("pacientes")
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
