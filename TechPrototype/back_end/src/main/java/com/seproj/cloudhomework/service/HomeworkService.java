package com.seproj.cloudhomework.service;

import com.seproj.cloudhomework.entity.Homework;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface HomeworkService {
    List<Homework> findHomeworkByCourseId(String courseId);
    List<Homework> findHomeworkByNameLike(String name);
    void saveOrUpdate(Homework homework);
}
