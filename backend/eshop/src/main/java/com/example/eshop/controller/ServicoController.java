package com.example.eshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eshop.servicos.Servico;
import com.example.eshop.servicos.ServicoRepository;
import com.example.eshop.servicos.ServicoRequestDTO;
import com.example.eshop.servicos.ServicoResponseDTO;
import com.example.eshop.users.UserResponseDTO;

@RestController
@RequestMapping("servico")

public class ServicoController {
		
		@Autowired
		private ServicoRepository repository;
		@CrossOrigin(origins="*", allowedHeaders = "*")
		@GetMapping
		public List<ServicoResponseDTO> getServico() {
			
			List<ServicoResponseDTO> servicoList = repository.findAll().stream().map(ServicoResponseDTO:: new).toList();
			return servicoList;
				
		}
		@CrossOrigin(origins="*", allowedHeaders = "*")
		@PostMapping
		public void addServico(@RequestBody ServicoRequestDTO data) {
			
			Servico servico = new Servico(data);
			repository.save(servico);
		
		}
		
		@CrossOrigin(origins="*", allowedHeaders = "*")
		@GetMapping("/{id}")
		public ResponseEntity<ServicoResponseDTO> getById(@PathVariable Long id) {
			return repository.findById(id)
					.map(user -> ResponseEntity.ok(new ServicoResponseDTO(user)))
					.orElseGet(() -> ResponseEntity.notFound().build());
		}
	
	
}
