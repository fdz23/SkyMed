package com.skynet.skymed.controller;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.NestedRuntimeException;
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
import com.skynet.skymed.service.EmailService;
import com.skynet.skymed.service.ValidacaoPessoaService;
import com.skynet.skymed.util.GeradorDeSenha;
import com.skynet.skymed.util.GeradorDeToken;

@RestController
//@RequestMapping("skymed")
@RequestMapping("pessoa")
public class PessoaController {

	@Autowired
	private PessoaRepository pessoaDB;

	private GeradorDeToken getToken = new GeradorDeToken();

	private EmailService servicoDeEmailPaciente = new EmailService();
	private final String PACIENTE_INEXISTENTE = "Paciente inexistente.";
	
	@ExceptionHandler({ NestedRuntimeException.class })
    public ResponseEntity<Object> handleException(NestedRuntimeException ex) {
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

		UUID uuid = UUID.randomUUID();
		String senhaAleatoria = uuid.toString().substring(0, 8);

		var usuario = object.getUsuario();

		usuario.setSenha(GeradorDeSenha.geraSenhaSegura(senhaAleatoria, usuario.getEmail()));
		usuario.setTokenAutenticacaoEmail(getToken.geraToken());

		pessoaDB.save(object);

		servicoDeEmailPaciente.enviaEmail(object.getNome(), 
				usuario.getEmail(),
				senhaAleatoria,
				usuario.getTokenAutenticacaoEmail());

		object.getUsuario().setSenha("");

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

		object.getUsuario().setSenha("");

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

			pessoa.get().getUsuario().setSenha("");

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

		for (var paciente : pacientes) {
			paciente.getUsuario().setSenha("");
		}

		return ResponseEntity.ok(pacientes);
	}
	 
	 @GetMapping(path = "usuario/{id}")
	 @PreAuthorize("hasRole('USER')")
	 public ResponseEntity<Object> getPacienteFromUsuarioId(@PathVariable("id") Integer id) {
		 var paciente = pessoaDB.findByUsuarioId(id.longValue());
		 
		 if (paciente != null) {
			 paciente.getUsuario().setSenha("");
			
			 return ResponseEntity.ok(paciente);
		 } else {
			 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(PACIENTE_INEXISTENTE);
		 }
	 }

}
