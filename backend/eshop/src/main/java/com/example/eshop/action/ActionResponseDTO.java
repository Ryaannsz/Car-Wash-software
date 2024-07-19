package com.example.eshop.action;

import java.sql.Date;

public record ActionResponseDTO(Long id, Date date, String placa, Long service_id, Long user_id) {
	 public ActionResponseDTO(Action action) {
		this(action.getId(), action.getDate(), action.getPlaca(), action.getServico().getId(), action.getUser().getId());
	}
}
