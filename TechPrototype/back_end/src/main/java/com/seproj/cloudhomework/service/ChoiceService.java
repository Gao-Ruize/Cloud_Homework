package com.seproj.cloudhomework.service;

import com.seproj.cloudhomework.entity.Choice;
import org.springframework.stereotype.Service;

@Service
public interface ChoiceService {
    Choice findDistinctById(int id);
    Choice save(Choice choice);
}
