package com.seproj.cloudhomework.repository;

import com.seproj.cloudhomework.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    Course findDistinctByCourseId(String courseId);
}
