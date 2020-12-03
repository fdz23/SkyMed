package com.skynet.skymed.controller;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skynet.skymed.model.Usuario;

import com.skynet.skymed.repository.UsuarioRepository;
import com.skynet.skymed.service.EmailDePacienteService;

@RestController

@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioDB;

	private EmailDePacienteService emailService = new EmailDePacienteService();

	@ExceptionHandler({ HttpMessageNotReadableException.class })
	public ResponseEntity<Object> handleException(HttpMessageNotReadableException ex) {
		return ResponseEntity.badRequest().body(ex.getMostSpecificCause().getMessage());
	}

	@PostMapping(path = "login")
	public ResponseEntity<Object> login(@RequestBody Usuario object) {
		var usuario = usuarioDB.findByEmail(object.getEmail());
		var mensagemErro = "E-mail ou senha incorreta.";

		if (usuario == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagemErro);
		}

		if (!usuario.getSenha().equals(object.getSenha())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensagemErro);
		}

		usuario.setSenha("");

		return ResponseEntity.ok(usuario);
	}

	@PutMapping(path = "trocarSenha")
	@PreAuthorize("hasRole('USUARIO')")
	public ResponseEntity<Object> trocarSenha(@RequestBody Usuario object) {
		var usuario = usuarioDB.findByEmail(object.getEmail());
		var mensagemErro = "E-mail ou senha incorreta.";

		if (usuario == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagemErro);
		}

		if (!usuario.getSenha().equals(object.getSenha())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensagemErro);
		}

		usuario.setSenha(object.getSenha());

		usuarioDB.save(usuario);

		usuario.setSenha("");

		return ResponseEntity.ok(usuario);
	}

	@PostMapping(path = "logout")
	@PreAuthorize("hasRole('USUARIO')")
	public ResponseEntity<Object> logout(@RequestBody Usuario object) {
		var usuario = usuarioDB.findByEmail(object.getEmail());
		var mensagemErro = "E-mail ou senha incorreta.";

		if (usuario == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagemErro);
		}

		if (!usuario.getSenha().equals(object.getSenha())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensagemErro);
		}

		usuario.setToken_autenticacao("");

		usuarioDB.save(usuario);

		usuario.setSenha("");

		return ResponseEntity.ok(usuario);
	}

	@PutMapping(path = "autenticaConta")
	public ResponseEntity<Object> autenticaConta(@RequestBody Usuario object) {

		var usuario = usuarioDB.findByEmail(object.getEmail());

		if (usuario == null) {

			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");

		}
		if (object.getToken_sendgrid_autenticacao().equals(usuario.getToken_sendgrid_autenticacao())) {

			usuario.setEhAutenticacdo(true);

			usuarioDB.save(usuario);

			usuario.setSenha("");

			return ResponseEntity.ok(usuario);

		} else {

			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Token INválido");
		}

	}

	@GetMapping(path = "/{email}")
	public ResponseEntity<Object> getByEmail(@PathVariable("email") String email) {
		try {
			var pessoa = usuarioDB.findByEmail(email);

			return ResponseEntity.ok(pessoa);

		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro ao recuperar usuário");
		}
	}

}
