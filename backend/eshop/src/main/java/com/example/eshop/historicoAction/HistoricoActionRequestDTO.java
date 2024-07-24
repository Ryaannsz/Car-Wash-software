package com.example.eshop.historicoAction;

import java.sql.Date;

public record HistoricoActionRequestDTO(Date date, String placa, Long servico_id, Long user_id) {

}
