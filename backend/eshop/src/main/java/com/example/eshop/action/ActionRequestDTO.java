package com.example.eshop.action;

import java.sql.Date;

public record ActionRequestDTO(Date date, String placa, Long servico_id, Long user_id) {

}
