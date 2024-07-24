package com.example.eshop.historicoAction;

import java.sql.Date;

import com.example.eshop.action.ActionRequestDTO;
import com.example.eshop.servicos.Servico;
import com.example.eshop.users.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Table(name="historicoAction")
@Entity
public class HistoricoAction {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Date date;
	private Date dateFinalizado;

	private String placa;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "servico_id")
	private Servico servico;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
	public HistoricoAction(HistoricoActionRequestDTO data, Servico servico, User user, Date dataFinalizado) {
		this.date=data.date();
		this.dateFinalizado=dataFinalizado;
		this.placa=data.placa();
		this.servico=servico;
		this.user=user;
	}
	
	public HistoricoAction() {
		
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
	public Date getDateFinalizado() {
		return dateFinalizado;
	}

	public void setDateFinalizado(Date dateFinalizado) {
		this.dateFinalizado = dateFinalizado;
	}
	
	
}
