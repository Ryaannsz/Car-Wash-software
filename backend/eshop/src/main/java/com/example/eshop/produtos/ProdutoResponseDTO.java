package com.example.eshop.produtos;

public record ProdutoResponseDTO(Long id, String name, String descricao, String img) {

	public ProdutoResponseDTO(Produto produto) {
		this(produto.getId(), produto.getName(), produto.getDescricao(), produto.getImg());
	}
	
}
