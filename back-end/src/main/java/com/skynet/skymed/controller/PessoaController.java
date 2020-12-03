package com.skynet.skymed.controller;

import java.util.NoSuchElementException;
import java.util.Optional;

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
import com.skynet.skymed.service.ValidacaoPessoaService;

@RestController
//@RequestMapping("skymed")
@RequestMapping("pessoa")
public class PessoaController {

	@Autowired
	private PessoaRepository pessoaDB;

	private EmailDePacienteService servicoDeEmailPaciente = new EmailDePacienteService();
	private final String PACIENTE_INEXISTENTE = "Paciente inexistente.";

	@ExceptionHandler({ HttpMessageNotReadableException.class })
	public ResponseEntity<Object> handleException(HttpMessageNotReadableException ex) {
		return ResponseEntity.badRequest().body(ex.getMostSpecificCause().getMessage());
	}

	@PostMapping
	public ResponseEntity<Object> postPessoa(@RequestBody Pessoa object) throws Exception {
		if (object.getId() != null) {
			var pessoa = getById(object.getId().intValue());

			if (pessoa.getBody().equals(PACIENTE_INEXISTENTE)) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Paciente existente.");
			}
		}

		var validacao = new ValidacaoPessoaService(pessoaDB).valideInsercao(object);

		if (validacao != null) {
			return validacao;
		}

		servicoDeEmailPaciente.enviaEmail(object);
		pessoaDB.save(object);
		return ResponseEntity.ok(object);

	}

	@PutMapping
	@PreAuthorize("hasRole('PACIENTE')")
	public ResponseEntity<Object> putPessoa(@RequestBody Pessoa object) {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID Inválido");
		}

		var pessoa = getById(object.getId().intValue());

		if (pessoa.getBody().equals(PACIENTE_INEXISTENTE)) {

			return pessoa;

		}

		var validacao = new ValidacaoPessoaService(pessoaDB).valideAtualizacao(object);

		if (validacao != null) {
			return validacao;
		}

		pessoaDB.save(object);
		return ResponseEntity.ok(object);
	}

	@DeleteMapping(path = "/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> deleteObject(@PathVariable("id") Integer id) {
		var pessoa = getById(id);

		if (pessoa.getBody().equals(PACIENTE_INEXISTENTE)) {

			return pessoa;
		}

		pessoaDB.deleteById((long) id);

		return ResponseEntity.ok(null);
	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Integer id) {
		try {
			var pessoa = pessoaDB.findById((long) id);

			return ResponseEntity.ok(pessoa.get());

		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(PACIENTE_INEXISTENTE);
		}
	}

	@GetMapping(path = "pacientes")
	@PreAuthorize("hasRole('ADMIN')")
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
