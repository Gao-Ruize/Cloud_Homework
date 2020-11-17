package com.seproj.cloudhomework.repository;

import com.seproj.cloudhomework.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    Course findDistinctByCourseId(String courseId);
    List<Course> findByNameLike(String name);
    Course findByName(String name);
    List<Course> findByTeacherId(int teacherId);
}
