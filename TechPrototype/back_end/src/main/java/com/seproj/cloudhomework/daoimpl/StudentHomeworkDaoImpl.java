package com.seproj.cloudhomework.daoimpl;

import com.seproj.cloudhomework.dao.StudentHomeworkDao;
import com.seproj.cloudhomework.entity.StudentHomework;
import com.seproj.cloudhomework.repository.StudentHomeworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentHomeworkDaoImpl implements StudentHomeworkDao {
    @Autowired
    StudentHomeworkRepository studentHomeworkRepository;

    @Override
    public List<StudentHomework> findStudentHomeworkByHomeworkId(int homeworkId) {
        return studentHomeworkRepository.findByHomeworkId(homeworkId);
    }

    @Override
    public List<StudentHomework> findStudentHomeworkByStudentId(String studentId) {
        return studentHomeworkRepository.findByStudentId(studentId);
    }

    @Override
    public void saveOrUpdate(StudentHomework studentHomework) {
        studentHomeworkRepository.save(studentHomework);
    }
}
