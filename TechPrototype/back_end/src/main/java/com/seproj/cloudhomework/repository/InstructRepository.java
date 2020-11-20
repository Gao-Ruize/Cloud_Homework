package com.seproj.cloudhomework.repository;

import com.seproj.cloudhomework.entity.Instruct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstructRepository extends JpaRepository<Instruct, Integer> {
    List<Instruct> findByCourseId(int courseId);
    List<Instruct> findByStudentId(String studentId);
    Instruct findDistinctByCourseIdAndStudentId(int courseId, String studentId);
}
