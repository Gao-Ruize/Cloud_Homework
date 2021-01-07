package com.seproj.cloudhomework.repository;

import com.seproj.cloudhomework.entity.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChoiceRepository extends JpaRepository<Choice, Integer> {
    Choice findDistinctById(int id);
    Choice save(Choice choice);

}
