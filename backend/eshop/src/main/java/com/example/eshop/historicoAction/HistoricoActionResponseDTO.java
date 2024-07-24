package com.example.eshop.historicoAction;

import java.sql.Date;

import com.example.eshop.action.Action;

public record HistoricoActionResponseDTO(Long id, Date date, String placa, Long service_id, Long user_id, Date datefinalizado) {
	public HistoricoActionResponseDTO(HistoricoAction action) {
		this(action.getId(), action.getDate(), action.getPlaca(), action.getServico().getId(), action.getUser().getId(), action.getDateFinalizado());
	}
}
