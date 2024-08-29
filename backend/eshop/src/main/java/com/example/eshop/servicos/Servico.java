package com.example.eshop.servicos;

import java.util.List;

import com.example.eshop.action.Action;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
		
		
@Table(name="servicos")
@Entity(name="servicos")



@EqualsAndHashCode(of="id")
public class Servico {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String tipo;
	private Integer preco;
	
	@OneToMany(mappedBy="servico")
	private List<Action> actions;
	
	public Servico(ServicoRequestDTO data) {
		
		this.tipo = data.tipo();
		this.preco = data.preco();
		
	}
	
	public List<Action> getActions() {
		return actions;
	}

	public void setActions(List<Action> actions) {
		this.actions = actions;
	}

	public Servico() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public Integer getPreco() {
		return preco;
	}

	public void setPreco(Integer preco) {
		this.preco = preco;
	}
	
	

}
