package com.seproj.cloudhomework.daoimpl;

import com.seproj.cloudhomework.dao.HomeworkDao;
import com.seproj.cloudhomework.entity.Homework;
import com.seproj.cloudhomework.repository.HomeworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HomeworkDaoImpl implements HomeworkDao {
    @Autowired
    HomeworkRepository homeworkRepository;

    @Override
    public List<Homework> findHomeworkByCourseId(String courseId) {
        return homeworkRepository.findByCourseId(courseId);
    }

    @Override
    public List<Homework> findHomeworkByNameLike(String name) {
        return homeworkRepository.findByNameLike(name);
    }

    @Override
    public void saveOrUpdate(Homework homework) {
        homeworkRepository.save(homework);
    }
}
