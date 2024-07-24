package com.example.eshop.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eshop.action.Action;
import com.example.eshop.action.ActionRepository;
import com.example.eshop.action.ActionRequestDTO;
import com.example.eshop.action.ActionResponseDTO;
import com.example.eshop.historicoAction.HistoricoAction;
import com.example.eshop.historicoAction.HistoricoActionRepository;
import com.example.eshop.historicoAction.HistoricoActionRequestDTO;
import com.example.eshop.historicoAction.HistoricoActionResponseDTO;
import com.example.eshop.servicos.Servico;
import com.example.eshop.servicos.ServicoRepository;
import com.example.eshop.users.User;
import com.example.eshop.users.UserRepository;

@RestController
@RequestMapping("historicoaction")


public class HistoricoActionController {


	@Autowired
	private HistoricoActionRepository historicoActionRepository;
	
	@Autowired
	private ServicoRepository servicoRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@CrossOrigin(origins="*", allowedHeaders = "*")
	@GetMapping
	public List<HistoricoActionResponseDTO> getAction(){	
		List<HistoricoActionResponseDTO> historicoActionList = historicoActionRepository.findAll().stream().map(HistoricoActionResponseDTO:: new).toList();
		return historicoActionList;
		
	}
	
	@PostMapping
	@CrossOrigin(origins="*", allowedHeaders = "*")
	public void addAction(@RequestBody HistoricoActionRequestDTO data) {
		
		LocalDate localData = LocalDate.now();
		Date sqlDate = Date.valueOf(localData);
		
		Servico servico = servicoRepository.findById(data.servico_id()).orElseThrow(()-> new RuntimeException("Servico não achado"));
		User user = userRepository.findById(data.user_id()).orElseThrow(()-> new RuntimeException("User não achado"));
		HistoricoAction historicoAction = new HistoricoAction(data, servico, user, sqlDate);
		historicoActionRepository.save(historicoAction);
	}
	
	@CrossOrigin(origins="*", allowedHeaders="*")
	@DeleteMapping("delete/{id}")
	public void removeHistoricoAction(@PathVariable Long id) {
		historicoActionRepository.findById(id).orElseThrow(() -> new RuntimeException("Action não encontrada"));
		historicoActionRepository.deleteById(id);
	}
	
}
