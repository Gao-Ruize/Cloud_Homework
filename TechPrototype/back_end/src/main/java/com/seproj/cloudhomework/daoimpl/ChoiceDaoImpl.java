package com.seproj.cloudhomework.daoimpl;

import com.seproj.cloudhomework.dao.ChoiceDao;
import com.seproj.cloudhomework.entity.Choice;
import com.seproj.cloudhomework.repository.ChoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChoiceDaoImpl implements ChoiceDao {
    @Autowired
    ChoiceRepository choiceRepository;

    @Override
    public Choice findDistinctById(int id) {
        return choiceRepository.findDistinctById(id);
    }

    @Override
    public Choice save(Choice choice) {return choiceRepository.save(choice);}
}
