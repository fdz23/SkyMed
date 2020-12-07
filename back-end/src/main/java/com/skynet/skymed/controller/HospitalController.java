package com.skynet.skymed.controller;

import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.NestedRuntimeException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.skynet.skymed.repository.PessoaRepository;
import com.skynet.skymed.service.EmailService;
import com.skynet.skymed.service.ValidacaoPessoaService;
import com.skynet.skymed.util.GeradorDeSenha;
import com.skynet.skymed.util.GeradorDeToken;

@RestController

@RequestMapping("/hospital")
public class HospitalController {

	@Autowired
	private PessoaRepository pessoaDB;

	private GeradorDeToken getToken = new GeradorDeToken();

	private final String HOSPITAL_INEXISTENTE = "Hospital inexistente.";
	private EmailService servicoDeEmailHospital = new EmailService();

	@Autowired
	private HospitalRepository hospitalDB;
	
	@ExceptionHandler({ NestedRuntimeException.class })
    public ResponseEntity<Object> handleException(NestedRuntimeException ex) {
		return ResponseEntity.badRequest().body(ex.getMostSpecificCause().getMessage());
	}

	@GetMapping
	public ResponseEntity<Object> getObject() {
		var hospitais = hospitalDB.findAll();

		if (hospitais.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi encontrado nenhum hospital.");
		}

		for (var hospital : hospitais) {
			hospital.getPessoa().getUsuario().setSenha("");
		}

		return ResponseEntity.ok(hospitais);
	}

	@PostMapping
	public ResponseEntity<Object> postHospital(@RequestBody Hospital object) throws Exception {
		if (object.getId() != null) {
			var hospital = getById(object.getId().intValue());

			if (!hospital.getBody().equals(HOSPITAL_INEXISTENTE)) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hospital existente.");
			}
		}

		var validacao = new ValidacaoPessoaService(pessoaDB).valideInsercao(object.getPessoa());

		if (validacao != null) {
			return validacao;
		}

		UUID uuid = UUID.randomUUID();
		String senhaAleatoria = uuid.toString().substring(0, 8);

		var usuario = object.getPessoa().getUsuario();

		usuario.setTokenAutenticacaoEmail(getToken.geraToken());
        usuario.setSenha(GeradorDeSenha.geraSenhaSegura(senhaAleatoria, usuario.getEmail()));

		hospitalDB.save(object);
		

		servicoDeEmailHospital.enviaEmail(
				object.getPessoa().getNome(),
				usuario.getEmail(), 
				senhaAleatoria,
				usuario.getTokenAutenticacaoEmail());

		object.getPessoa().getUsuario().setSenha("");

		return ResponseEntity.ok(object);
	}

	@PutMapping
	@PreAuthorize("hasRole('HOSPITAL')")
	public ResponseEntity<Object> putHospital(@RequestBody Hospital object) {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id inválido.");
		}

		var hospital = getById(object.getId().intValue());

		if (hospital.getBody().equals(HOSPITAL_INEXISTENTE)) {
			return hospital;
		}

		var validacao = new ValidacaoPessoaService(pessoaDB).valideAtualizacao(object.getPessoa());

		if (validacao != null) {
			return validacao;
		}

		hospitalDB.save(object);

		object.getPessoa().getUsuario().setSenha("");

		return ResponseEntity.ok(object);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
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

			hospital.get().getPessoa().getUsuario().setSenha("");

			return ResponseEntity.ok(hospital.get());
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(HOSPITAL_INEXISTENTE);
		}
	}

	@GetMapping(path = "usuario/{id}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Object> getHospitalFromUsuarioId(@PathVariable("id") Integer id) {
		var hospital = hospitalDB.findByPessoaUsuarioId(id.longValue());

		if (hospital != null) {
			hospital.getPessoa().getUsuario().setSenha("");

			return ResponseEntity.ok(hospital);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(HOSPITAL_INEXISTENTE);
		}
	}
}
