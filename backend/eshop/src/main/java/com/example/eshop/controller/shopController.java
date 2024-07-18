package com.example.eshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eshop.produtos.Produto;
import com.example.eshop.produtos.ProdutoRepository;
import com.example.eshop.produtos.ProdutoRequestDTO;
import com.example.eshop.produtos.ProdutoResponseDTO;

import lombok.Getter;

@RestController
@RequestMapping("shop")

public class shopController {
	
	@Autowired
	private ProdutoRepository repository;
	
	
	@CrossOrigin(origins="*", allowedHeaders = "*")
	@PostMapping
	public void insertProduct(@RequestBody ProdutoRequestDTO data) {
		Produto produtoData = new Produto(data);
		repository.save(produtoData);
	}
	
	
	@CrossOrigin(origins="*", allowedHeaders = "*")
	@GetMapping
	public List<ProdutoResponseDTO> getAll() {
		List<ProdutoResponseDTO> produtosList = repository.findAll().stream().map(ProdutoResponseDTO::new).toList();
		return produtosList;
	}
	
}
