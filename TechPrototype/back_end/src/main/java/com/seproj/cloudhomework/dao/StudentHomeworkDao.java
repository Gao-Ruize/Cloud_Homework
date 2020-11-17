package com.seproj.cloudhomework.dao;

import com.seproj.cloudhomework.entity.StudentHomework;

import java.util.List;

public interface StudentHomeworkDao {
    List<StudentHomework> findStudentHomeworkByHomeworkId(int homeworkId);
    List<StudentHomework> findStudentHomeworkByStudentId(String studentId);
    void saveOrUpdate(StudentHomework studentHomework);
}
