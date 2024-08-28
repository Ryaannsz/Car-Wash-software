package com.example.eshop.action;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface ActionRepository extends JpaRepository<Action, Long>{

	
	List<Action> findByUserId(Long userId);
}