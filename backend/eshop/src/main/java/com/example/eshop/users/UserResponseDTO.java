package com.example.eshop.users;

public record UserResponseDTO(Long id, String name, String endereco, Long telefone) {
	public UserResponseDTO(User user) {
		this(user.getId(), user.getName(), user.getEndereco(), user.getTelefone());
	}
}
