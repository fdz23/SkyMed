package com.skynet.skymed.controller;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.skynet.skymed.interfaces.IController;
import com.skynet.skymed.model.Especialidade;
import com.skynet.skymed.repository.EspecialidadeRepository;

@RestController

@RequestMapping("/especialidade")
public class EspecialidadeController implements IController<Especialidade> {
	
	
	@Autowired
	private EspecialidadeRepository especialidadeDB;
	
	@GetMapping
	@Override
	public ArrayList<Especialidade> getObject(){
		return (ArrayList<Especialidade>) especialidadeDB.findAll();
	}
	
	@GetMapping
	@Override
	public void postAndPutObject(@RequestBody Especialidade object) {
		especialidadeDB.save(object);
		
	}
	@DeleteMapping("/{id}")
	@Override
	public void deleteObject(@PathVariable("id") Integer id) {
		especialidadeDB.deleteById((long)id);
		
	}
	
	@GetMapping("/{id}")
	@Override
	public Especialidade getById(@PathVariable("id") Integer id)  {
		
		return especialidadeDB.getOne((long)id);
	}
	
	

}
