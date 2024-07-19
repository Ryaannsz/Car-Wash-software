package com.example.eshop.action;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.eshop.servicos.Servico;
import com.example.eshop.servicos.ServicoRepository;
import com.example.eshop.users.User;
import com.example.eshop.users.UserRepository;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;


@Table(name="action")
@Entity(name="action")
public class Action {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Date date;
	private String placa;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "servico_id")
	private Servico servico;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
	
	public Action(ActionRequestDTO data, Servico servico, User user) {
		this.date=data.date();
		this.placa=data.placa();
		this.servico=servico;
		this.user=user;
	}
	
	public Action() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public Servico getServico() {
		return servico;
	}

	public void setServico(Servico servico) {
		this.servico = servico;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
	
}
