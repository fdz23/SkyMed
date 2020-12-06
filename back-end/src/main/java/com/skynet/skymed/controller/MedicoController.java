package com.skynet.skymed.controller;

import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.skynet.skymed.model.Medico;
import com.skynet.skymed.repository.HorarioRepository;
import com.skynet.skymed.repository.MedicoRepository;
import com.skynet.skymed.repository.PessoaRepository;
import com.skynet.skymed.service.EmailService;
import com.skynet.skymed.service.ValidacaoPessoaService;
import com.skynet.skymed.util.GeradorDeSenha;
import com.skynet.skymed.util.GeradorDeToken;

@RestController

@RequestMapping("/medico")
public class MedicoController {

	@Autowired
	private PessoaRepository pessoaDB;

	@Autowired
	private HorarioRepository horarioDB;
	
	private GeradorDeToken getToken = new GeradorDeToken();

	private final String MEDICO_INEXISTENTE = "Médico inexistente.";
	private EmailService servicoDeEmailMedico = new EmailService();

	@Autowired
	private MedicoRepository medicoDB;

	@ExceptionHandler({ HttpMessageNotReadableException.class })
	public ResponseEntity<Object> handleException(HttpMessageNotReadableException ex) {
		return ResponseEntity.badRequest().body(ex.getMostSpecificCause().getMessage());
	}

	@GetMapping
	public ResponseEntity<Object> getObject() {
		var medicos = medicoDB.findAll();

		if (medicos.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi encontrado nenhum médico.");
		}

		for (var medico : medicos) {
			medico.getPessoa().getUsuario().setSenha("");
		}

		return ResponseEntity.ok(medicos);
	}

	@PostMapping
	@PreAuthorize("hasRole('HOSPITAL')")
	public ResponseEntity<Object> postMedico(@RequestBody Medico object) throws Exception {
		if (object.getId() != null) {
			var medico = getById(object.getId().intValue());

			if (!medico.getBody().equals(MEDICO_INEXISTENTE)) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Médico existente.");
			}
		}

		var validacao = new ValidacaoPessoaService(pessoaDB).valideInsercao(object.getPessoa());

		if (validacao != null) {
			return validacao;
		}

		var horariosTrabalho = object.getHorariosTrabalho();

		if (horariosTrabalho != null && !horariosTrabalho.isEmpty()) {
			for (var horario : horariosTrabalho) {
				horario.setMedico(object);
			}
		}

		var horariosConsulta = object.getHorariosConsulta();

		if (horariosConsulta != null && !horariosConsulta.isEmpty()) {
			for (var horario : horariosConsulta) {
				horario.setMedico(object);
			}
		}

		UUID uuid = UUID.randomUUID();
		String senhaAleatoria = uuid.toString().substring(0, 8);

		var usuario = object.getPessoa().getUsuario();
		
		usuario.setTokenAutenticacaoEmail(getToken.geraToken());
        usuario.setSenha(GeradorDeSenha.geraSenhaSegura(senhaAleatoria, usuario.getEmail()));
        
        medicoDB.save(object);

        servicoDeEmailMedico.enviaEmail(
        		object.getPessoa().getNome(),
        		usuario.getEmail(), 
        		senhaAleatoria,
        		usuario.getTokenAutenticacaoEmail());
        
		object.getPessoa().getUsuario().setSenha("");

		return ResponseEntity.ok(object);
	}

	@PutMapping
	@PreAuthorize("hasRole('MEDICO')")
	public ResponseEntity<Object> putMedico(@RequestBody Medico object) throws Exception {
		if (object.getId() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id inválido.");
		}

		var medico = getById(object.getId().intValue());

		if (medico.getBody().equals(MEDICO_INEXISTENTE)) {
			return medico;
		}

		var validacao = new ValidacaoPessoaService(pessoaDB).valideAtualizacao(object.getPessoa());

		if (validacao != null) {
			return validacao;
		}

		var horariosTrabalho = object.getHorariosTrabalho();

		if (horariosTrabalho != null && !horariosTrabalho.isEmpty()) {
			for (var horario : horariosTrabalho) {
				horario.setMedico(object);
			}
		}

		var horariosConsulta = object.getHorariosConsulta();

		if (horariosConsulta != null && !horariosConsulta.isEmpty()) {
			for (var horario : horariosConsulta) {
				horario.setMedico(object);
			}
		}

		medicoDB.save(object);

		object.getPessoa().getUsuario().setSenha("");

		return ResponseEntity.ok(object);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> deleteMedico(@PathVariable("id") Integer id) {
		var medico = getById(id);

		if (medico.getBody().equals(MEDICO_INEXISTENTE)) {
			return medico;
		}

		medicoDB.deleteById((long) id);

		return ResponseEntity.ok(null);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Integer id) {
		try {
			var medico = medicoDB.findById((long) id);

			medico.get().getPessoa().getUsuario().setSenha("");

			return ResponseEntity.ok(medico.get());
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(MEDICO_INEXISTENTE);
		}
	}
}
