package com.example.eshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.eshop.action.ActionResponseDTO;
import com.example.eshop.servicos.Servico;
import com.example.eshop.servicos.ServicoRepository;
import com.example.eshop.users.User;
import com.example.eshop.users.UserRepository;
import com.example.eshop.action.Action;
import com.example.eshop.action.ActionRepository;
import com.example.eshop.action.ActionRequestDTO;

@RestController
@RequestMapping("action")

public class ActionController {

	@Autowired
	private ActionRepository actionRepository;
	
	@Autowired
	private ServicoRepository servicoRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	
	@CrossOrigin(origins="*", allowedHeaders = "*")
	@GetMapping
	public List<ActionResponseDTO> getAction(){	
		List<ActionResponseDTO> actionList = actionRepository.findAll().stream().map(ActionResponseDTO:: new).toList();
		return actionList;
		
	}
	
	@PostMapping
	@CrossOrigin(origins="*", allowedHeaders = "*")
	public void addAction(@RequestBody ActionRequestDTO data) {
		Servico servico = servicoRepository.findById(data.servico_id()).orElseThrow(()-> new RuntimeException("Servico não achado"));
		User user = userRepository.findById(data.user_id()).orElseThrow(()-> new RuntimeException("User não achado"));
		Action action = new Action(data, servico, user);
		actionRepository.save(action);
	}
	
}
