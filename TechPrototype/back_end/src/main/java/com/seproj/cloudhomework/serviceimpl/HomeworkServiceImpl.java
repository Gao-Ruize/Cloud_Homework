package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.HomeworkDao;
import com.seproj.cloudhomework.entity.Homework;
import com.seproj.cloudhomework.service.HomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeworkServiceImpl implements HomeworkService {
    @Autowired
    HomeworkDao homeworkDao;

    @Override
    public List<Homework> findHomeworkByCourseId(String courseId) {
        return homeworkDao.findHomeworkByCourseId(courseId);
    }

    @Override
    public List<Homework> findHomeworkByNameLike(String name) {
        return homeworkDao.findHomeworkByNameLike(name);
    }

    @Override
    public void saveOrUpdate(Homework homework) {
        homeworkDao.saveOrUpdate(homework);
    }
}
