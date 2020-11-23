package com.skynet.skymed.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skynet.skymed.model.Usuario;

import com.skynet.skymed.repository.UsuarioRepository;

@RestController

@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioDB;
	
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
}

