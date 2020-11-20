package com.seproj.cloudhomework.dao;

import com.seproj.cloudhomework.entity.Instruct;

import java.util.List;

public interface InstructDao {
    List<Instruct> findInstructByCourseId(int courseId);
    List<Instruct> findInstructByStudentId(String studentId);
    Instruct findDistinctByCourseIdAndStudentId(int courseId, String studentId);
    void saveOrUpdate(Instruct instruct);
}
