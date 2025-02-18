package com.seproj.cloudhomework.dao;

import com.seproj.cloudhomework.entity.Homework;

import java.util.List;

public interface HomeworkDao {
    Homework findHomeworkById(int hid);
    List<Homework> findHomeworkByCourseId(String courseId);
    List<Homework> findHomeworkByNameLike(String name);
    void saveOrUpdate(Homework homework);
}
