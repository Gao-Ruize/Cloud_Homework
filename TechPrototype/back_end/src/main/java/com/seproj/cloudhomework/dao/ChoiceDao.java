package com.seproj.cloudhomework.dao;

import com.seproj.cloudhomework.entity.Choice;

public interface ChoiceDao {
    Choice findDistinctById(int id);
    Choice save(Choice choice);
}
