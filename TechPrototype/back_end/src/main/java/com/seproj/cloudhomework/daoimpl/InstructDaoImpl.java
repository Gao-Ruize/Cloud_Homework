package com.seproj.cloudhomework.daoimpl;

import com.seproj.cloudhomework.dao.InstructDao;
import com.seproj.cloudhomework.entity.Instruct;
import com.seproj.cloudhomework.repository.InstructRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class InstructDaoImpl implements InstructDao {

    @Autowired
    InstructRepository instructRepository;

    @Override
    public List<Instruct> findInstructByCourseId(int courseId) {
        return instructRepository.findByCourseId(courseId);
    }

    @Override
    public List<Instruct> findInstructByStudentId(String studentId) {
        return instructRepository.findByStudentId(studentId);
    }

    @Override
    public void saveOrUpdate(Instruct instruct) {
        instructRepository.save(instruct);
    }
}
