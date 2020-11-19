package com.seproj.cloudhomework.repository;

import com.seproj.cloudhomework.entity.StudentHomework;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentHomeworkRepository extends JpaRepository<StudentHomework, Integer> {
    List<StudentHomework> findByHomeworkId(int homeworkId);
    List<StudentHomework> findByStudentId(String studentId);
    StudentHomework findByHomeworkIdAndStudentId(int homeworkId, String studentId);
    StudentHomework findDistinctById(int id);
}
