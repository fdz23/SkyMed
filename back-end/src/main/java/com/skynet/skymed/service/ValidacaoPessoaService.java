package com.skynet.skymed.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skynet.skymed.model.Pessoa;
import com.skynet.skymed.repository.PessoaRepository;

@Service
public class ValidacaoPessoaService {

	private PessoaRepository pessoaDB;
	
	public ValidacaoPessoaService(PessoaRepository pessoaDB) {
		this.pessoaDB = pessoaDB;
	}
	
	public ResponseEntity<Object> valideInsercao(Pessoa pessoa) {
		if (pessoaDB.findByCpf(pessoa.getCpf()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cpf existente.");
		} else if (pessoaDB.findByRg(pessoa.getRg()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("RG existente.");
		} else if (pessoaDB.findByUsuarioEmail(pessoa.getUsuario().getEmail()) != null) {
		 	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-mail existente.");
		} else {
			return null;
		}
	}
	
	public ResponseEntity<Object> valideAtualizacao(Pessoa pessoa) {
		var pessoaCpf = pessoaDB.findByCpf(pessoa.getCpf());
		
		if (pessoaCpf != null && !pessoaCpf.getUsuario().getEmail().equals(pessoa.getUsuario().getEmail())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-mail existente");
		} else {
			return null;
		}
	}
}
