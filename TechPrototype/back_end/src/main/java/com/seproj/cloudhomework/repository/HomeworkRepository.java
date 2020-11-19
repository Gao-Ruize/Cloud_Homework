package com.seproj.cloudhomework.repository;

import com.seproj.cloudhomework.entity.Homework;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HomeworkRepository extends JpaRepository<Homework, Integer> {
    Homework findDistinctById(int hid);
    List<Homework> findByCourseId(String courseId);
    List<Homework> findByNameLike(String name);
}
