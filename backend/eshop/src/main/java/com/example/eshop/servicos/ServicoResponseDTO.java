package com.example.eshop.servicos;

public record ServicoResponseDTO(Long id, String tipo, Integer preco) {
	public ServicoResponseDTO(Servico servico){
			this(servico.getId(), servico.getTipo(), servico.getPreco());
	}
}
