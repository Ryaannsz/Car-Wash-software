package com.example.eshop.historicoAction;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoricoActionRepository extends JpaRepository<HistoricoAction, Long> {

	List<HistoricoAction> findByUserId(Long userId);
}
