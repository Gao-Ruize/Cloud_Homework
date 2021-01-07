package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.ChoiceDao;
import com.seproj.cloudhomework.entity.Choice;
import com.seproj.cloudhomework.service.ChoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChoiceServiceImpl implements ChoiceService {
    @Autowired
    ChoiceDao choiceDao;

    @Override
    public Choice findDistinctById(int id) {
        return choiceDao.findDistinctById(id);
    }

    @Override
    public Choice save(Choice choice) {return choiceDao.save(choice);}
}
