package com.seproj.cloudhomework.daoimpl;

import com.seproj.cloudhomework.dao.CourseDao;
import com.seproj.cloudhomework.entity.Course;
import com.seproj.cloudhomework.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CourseDaoImpl implements CourseDao {
    @Autowired
    CourseRepository courseRepository;

    @Override
    public Course findCourseByCourseId(String courseId){
        return courseRepository.findDistinctByCourseId(courseId);
    }

    @Override
    public List<Course> findCoursesByNameLike(String name) {
        return null;
    }

    @Override
    public Course findCourseByName(String name) {
        return null;
    }

    @Override
    public List<Course> findCoursesByTeacherId(int teacherId) {
        return null;
    }

    @Override
    public void saveOrUpdate(Course course) {

    }
}
