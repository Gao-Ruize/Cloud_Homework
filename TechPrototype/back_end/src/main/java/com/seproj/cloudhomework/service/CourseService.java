package com.seproj.cloudhomework.service;

import com.seproj.cloudhomework.entity.Course;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CourseService {
    Course findCourseByCourseId(String courseId);
    List<Course> findCoursesByNameLike(String name);
    Course findCourseByName(String name);
    List<Course> findCoursesByTeacherId(int teacherId);
    void saveOrUpdate(Course course);
}
