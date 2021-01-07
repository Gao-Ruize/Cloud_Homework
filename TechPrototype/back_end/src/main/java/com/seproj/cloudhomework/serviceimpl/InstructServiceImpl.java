package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.InstructDao;
import com.seproj.cloudhomework.entity.Instruct;
import com.seproj.cloudhomework.service.InstructService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructServiceImpl implements InstructService {
    @Autowired
    InstructDao instructDao;

    @Override
    public List<Instruct> findByCourseId(int courseId) {
        return instructDao.findInstructByCourseId(courseId);
    }
}
