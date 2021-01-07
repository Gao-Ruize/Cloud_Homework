package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.CourseDao;
import com.seproj.cloudhomework.entity.Course;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class CourseServiceImplTest {
    @Autowired
    private CourseServiceImpl courseServiceImpl;

    @MockBean
    private CourseDao courseDao;

    @BeforeEach
    void setUp() throws Exception{
        Course course = new Course("CourseName",
                "CourseId",
                "CourseInfo",
                128,
                0);

        List<Course> courseList = new ArrayList<>();
        courseList.add(new Course("CourseName",
                "CourseId",
                "CourseInfo",
                128,
                0));
        courseList.add(new Course("CourseName2",
                "CourseId2",
                "CourseInfo2",
                128,
                0));

        Mockito.when(courseDao.findCourseByCourseId(Mockito.anyString())).thenAnswer(
                new Answer<Course>(){
                    @Override
                    public Course answer(InvocationOnMock invocationOnMock) throws Throwable {
                        Course course = new Course("CourseName",
                                "CourseId",
                                "CourseInfo",
                                128,
                                0);
                        return course;
                    }
                }
        );
        Mockito.when(courseDao.findCoursesByNameLike("Course")).thenReturn(courseList);
        Mockito.when(courseDao.findCourseByName("CourseName")).thenReturn(course);
        Mockito.when(courseDao.findCoursesByTeacherId(128)).thenReturn(courseList);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void findCourseByCourseId() {
        Course exp = new Course("CourseName",
                "CourseId",
                "CourseInfo",
                128,
                0);
        assertEquals(exp, courseServiceImpl.findCourseByCourseId("CourseId"));
    }

    @Test
    void findCoursesByNameLike() {
        List<Course> exp = new ArrayList<>();
        exp.add(new Course("CourseName",
                "CourseId",
                "CourseInfo",
                128,
                0));

        exp.add(new Course("CourseName2",
                "CourseId2",
                "CourseInfo2",
                128,
                0));
        assertEquals(exp, courseServiceImpl.findCoursesByNameLike("Course"));
    }

    @Test
    void findCourseByName() {
        Course exp = new Course("CourseName",
                "CourseId",
                "CourseInfo",
                128,
                0);
        assertEquals(exp, courseServiceImpl.findCourseByName("CourseName"));
    }

    @Test
    void findCoursesByTeacherId() {
        List<Course> exp = new ArrayList<>();
        exp.add(new Course("CourseName",
                "CourseId",
                "CourseInfo",
                128,
                0));

        exp.add(new Course("CourseName2",
                "CourseId2",
                "CourseInfo2",
                128,
                0));
        assertEquals(exp, courseServiceImpl.findCoursesByTeacherId(128));
    }

    @Test
    void saveOrUpdate() {
        Course newCourse = new Course("CourseName",
                "CourseId",
                "CourseInfo",
                128,
                0);
        courseServiceImpl.saveOrUpdate(newCourse);
    }
}