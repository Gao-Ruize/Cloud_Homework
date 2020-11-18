package com.seproj.cloudhomework.dao;

import com.seproj.cloudhomework.entity.Course;

import java.util.List;

public interface CourseDao {
    Course findCourseById(int cid);
    Course findCourseByCourseId(String courseId);
    List<Course> findCoursesByNameLike(String name);
    Course findCourseByName(String name);
    List<Course> findCoursesByTeacherId(int teacherId);
    void saveOrUpdate(Course course);
}
