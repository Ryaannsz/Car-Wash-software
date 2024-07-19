package com.example.eshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eshop.servicos.Servico;
import com.example.eshop.servicos.ServicoRepository;
import com.example.eshop.servicos.ServicoRequestDTO;
import com.example.eshop.servicos.ServicoResponseDTO;

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
	
	
}
