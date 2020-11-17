package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.CourseDao;
import com.seproj.cloudhomework.entity.Course;
import com.seproj.cloudhomework.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    CourseDao courseDao;


    @Override
    public Course findCourseByCourseId(String courseId) {
        return courseDao.findCourseByCourseId(courseId);
    }

    @Override
    public List<Course> findCoursesByNameLike(String name) {
        return courseDao.findCoursesByNameLike(name);
    }

    @Override
    public Course findCourseByName(String name) {
        return courseDao.findCourseByName(name);
    }

    @Override
    public List<Course> findCoursesByTeacherId(int teacherId) {
        return courseDao.findCoursesByTeacherId(teacherId);
    }

    @Override
    public void saveOrUpdate(Course course) {
        courseDao.saveOrUpdate(course);
    }
}
