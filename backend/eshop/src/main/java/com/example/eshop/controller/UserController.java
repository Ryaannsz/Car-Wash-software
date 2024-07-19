package com.example.eshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eshop.users.User;
import com.example.eshop.users.UserRepository;
import com.example.eshop.users.UserRequestDTO;
import com.example.eshop.users.UserResponseDTO;

@RestController
@RequestMapping("user")
public class UserController {
	
	
	@Autowired
	private UserRepository repository;
	
	
	@CrossOrigin(origins="*", allowedHeaders = "*")
	@PostMapping
	public void addUser(@RequestBody UserRequestDTO data) {
		User userData = new User(data);
		repository.save(userData);
	}
	
	
	@CrossOrigin(origins="*", allowedHeaders = "*")
	@GetMapping
	public List<UserResponseDTO> getAll() {
		List<UserResponseDTO> userList = repository.findAll().stream().map(UserResponseDTO::new).toList();
		return userList;
	}
}
