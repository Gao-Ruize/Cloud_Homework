package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.*;
import com.seproj.cloudhomework.entity.*;
import com.seproj.cloudhomework.utils.Course.CourseDetail;
import com.seproj.cloudhomework.utils.Homework.HandInHomework;
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
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class StudentServiceImplTest {
    @Autowired
    private StudentServiceImpl studentServiceImpl;

    @MockBean
    private UserDao userDao;
    @MockBean
    private CourseDao courseDao;
    @MockBean
    private HomeworkDao homeworkDao;
    @MockBean
    private StudentHomeworkDao studentHomeworkDao;
    @MockBean
    private InstructDao instructDao;

    @BeforeEach
    void setUp() {
        // Mock for UserDao
        User UserXiaoMing = new User("XiaoMing", "XMsPassword",
                "XiaoMing", "518123456789",
                "XiaoMing@sjtu.edu.cn", "123456789", 0);    // id = 64
        UserXiaoMing.setId(64);
        User UserXiaoZhang = new User("XiaoZhang", "XZsPassword",
                "XiaoZhang", "518987654321",
                "XiaoZhang@sjtu.edu.cn", "987654321", 0);   // id = 128
        UserXiaoZhang.setId(128);
        User UserMrWang = new User("MrWang", "WangPassword",
                "MrWang", "11111111",
                "MrWang@sjtu.edu.cn", "22222222", 1);   // id = 256
        UserMrWang.setId(256);

        Mockito.when(userDao.findUserByUsername(Mockito.anyString())).thenAnswer(
                new Answer<User>(){
                    @Override
                    public User answer(InvocationOnMock invocation) throws Throwable {
                        if(invocation.getArgument(0).equals("XiaoMing")){
                            return UserXiaoMing;
                        }else if(invocation.getArgument(0).equals("XiaoZhang")){
                            return UserXiaoZhang;
                        }else if(invocation.getArgument(0).equals("MrWang")){
                            return UserMrWang;
                        }
                        else{
                            return null;
                        }
                    }
                }
        );
        Mockito.when(userDao.findUserByUserId(Mockito.anyString())).thenAnswer(
                new Answer<User>(){
                    @Override
                    public User answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals("518123456789")){
                            return UserXiaoMing;
                        }else if(invocationOnMock.getArgument(0).equals("518987654321")){
                            return UserXiaoZhang;
                        }else if(invocationOnMock.getArgument(0).equals("11111111")){
                            return UserMrWang;
                        }
                        else{
                            return null;
                        }
                    }
                }
        );
        Mockito.when(userDao.findUserById(Mockito.anyInt())).thenAnswer(
                new Answer<User>(){
                    @Override
                    public User answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals(64)){
                            return UserXiaoMing;
                        }else if(invocationOnMock.getArgument(0).equals(128)){
                            return UserXiaoZhang;
                        }else if(invocationOnMock.getArgument(0).equals(256)){
                            return UserMrWang;
                        }
                        else{
                            return null;
                        }
                    }
                }
        );

        // Mock for InstructDao
        Instruct instruct1 = new Instruct(128, "518123456789");
        Instruct instruct2 = new Instruct(256, "518987654321");
        Instruct instruct3 = new Instruct(128, "518987654321");

        Mockito.when(instructDao.findInstructByStudentId(Mockito.anyString())).thenAnswer(
                new Answer<List<Instruct>>(){
                    @Override
                    public List<Instruct> answer(InvocationOnMock invocationOnMock) throws Throwable {
                        List<Instruct> retList = new ArrayList<>();
                        if(invocationOnMock.getArgument(0).equals("518123456789")){
                            retList.add(instruct1);
                        }else if(invocationOnMock.getArgument(0).equals("518987654321")){
                            retList.add(instruct2);
                            retList.add(instruct3);
                        }
                        else{
                            retList = null;
                        }

                        return retList;
                    }
                }
        );

        // Mock for CourseDao
        Course course1 = new Course("CourseName1", "Course128",
                "CourseInfo1", 256, 1); // id = 128
        course1.setId(128);
        Course course2 = new Course("CourseName2", "Course256",
                "CourseInfo2", 256, 1); // id = 256
        course2.setId(256);

        Mockito.when(courseDao.findCourseById(Mockito.anyInt())).thenAnswer(
                new Answer<Course>(){
                    @Override
                    public Course answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals(128)){
                            return course1;
                        }else if(invocationOnMock.getArgument(0).equals(256)){
                            return course2;
                        }
                        else{
                            return null;
                        }
                    }
                }
        );

        // Mock for HomeworkDao
        Homework homework1 = new Homework("HomeworkName1", new Date(1609931794),
                new Date(2022, 12, 10), "Content1", "Course128"); // Id = 1
        homework1.setId(1);
        Homework homework2 = new Homework("HomeworkName2", new Date(1609931794),
                new Date(1609931795), "Content2", "Course128"); // Id = 2
        homework2.setId(2);
        Homework homework3 = new Homework("HomeworkName3", new Date(1609931794),
                new Date(1609931795), "Content3", "Course256"); // Id = 3
        homework3.setId(3);

        Mockito.when(homeworkDao.findHomeworkByCourseId(Mockito.anyString())).thenAnswer(
                new Answer<List<Homework>>(){
                    @Override
                    public List<Homework> answer(InvocationOnMock invocationOnMock) throws Throwable {
                        List<Homework> retList = new ArrayList<>();
                        if(invocationOnMock.getArgument(0).equals("Course128")){
                            retList.add(homework1);
                            retList.add(homework2);
                        }else if(invocationOnMock.getArgument(0).equals("Course256")){
                            retList.add(homework3);
                        }

                        return retList;
                    }
                }
        );
        Mockito.when(homeworkDao.findHomeworkById(Mockito.anyInt())).thenAnswer(
                new Answer<Homework>(){
                    @Override
                    public Homework answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals(1)){
                            return homework1;
                        }else if(invocationOnMock.getArgument(0).equals(2)){
                            return homework2;
                        }else if(invocationOnMock.getArgument(0).equals(3)){
                            return homework3;
                        }
                        else{
                            return null;
                        }
                    }
                }
        );

        // Mock for StudentHomeworkDao
        StudentHomework XM_HW1 = new StudentHomework(new Date(1609931794), 1,
                90, "Content1", "", "518123456789");
//        StudentHomework XZ_HW1 = new StudentHomework(new Date(1609931794), 1,
//                0, "Content1", "", "518987654321");
        StudentHomework XZ_HW3 = new StudentHomework(new Date(1609931794), 3,
                0, "Content3", "", "518123456789");

        Mockito.when(studentHomeworkDao.findStudentHomeworkByHomeworkIdAndStudentId(Mockito.anyInt(), Mockito.anyString())).thenAnswer(
                new Answer<StudentHomework>(){
                    @Override
                    public StudentHomework answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals(1)){
                            if(invocationOnMock.getArgument(1).equals("518123456789")){
                                return XM_HW1;
                            }
//                            else if(invocationOnMock.getArgument(1).equals("518987654321")){
//                                return XZ_HW1;
//                            }
                            else{
                                return null;
                            }
                        }else if(invocationOnMock.getArgument(0).equals(3)){
                            if(invocationOnMock.getArgument(1).equals("518987654321")){
                                return XZ_HW3;
                            }
                            else{
                                return null;
                            }
                        }
                        else{
                            return null;
                        }
                    }
                }
        );
        Mockito.when(studentHomeworkDao.findStudentHomeworkByStudentId(Mockito.anyString())).thenAnswer(
                new Answer<List<StudentHomework>>(){
                    @Override
                    public List<StudentHomework> answer(InvocationOnMock invocationOnMock) throws Throwable {
                        List<StudentHomework> retList = new ArrayList<>();
                        if(invocationOnMock.getArgument(0).equals("518123456789")){
                            retList.add(XM_HW1);
                        }else if(invocationOnMock.getArgument(0).equals("518987654321")){
//                            retList.add(XZ_HW1);
                            retList.add(XZ_HW3);
                        }
                        else{
                            retList = null;
                        }
                        return retList;
                    }
                }
        );
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getCoursesBySid() {
        int sid;
        List<Course> exp;

        // 学生不存在
        sid = 0;
        exp = null;
        assertEquals(exp, studentServiceImpl.getCoursesBySid(sid));

        // 学生存在
        sid = 64;
        Course oneCourse = new Course("CourseName1", "Course128",
                "CourseInfo1", 256, 1);
        oneCourse.setTeacherName("MrWang");
        oneCourse.setId(128);
        exp = new ArrayList<>();
        exp.add(oneCourse);
        assertEquals(exp, studentServiceImpl.getCoursesBySid(sid));
    }

    @Test
    void getCourseDetail() {
        int cid;
        CourseDetail exp;

        // 课程不存在
        cid = 0;
        exp = null;
        assertEquals(exp, studentServiceImpl.getCourseDetail(cid));

        // 课程
        cid = 128;
        exp = new CourseDetail(128, "CourseName1", "Course128",
                256, 1, "MrWang");
        assertEquals(exp, studentServiceImpl.getCourseDetail(cid));
    }

    @Test
    void getHomeworks() {
        int sid;
        int cid;
        int type;
        List<Homework> exp;
        Homework homework1 = new Homework("HomeworkName1", new Date(1609931794),
                new Date(2022, 12, 10), "Content1", "Course128"); // Id = 1
        homework1.setId(1);
        Homework homework2 = new Homework("HomeworkName2", new Date(1609931794),
                new Date(1609931795), "Content2", "Course128"); // Id = 2
        homework2.setId(2);

        // 用户不存在
        sid = 0;
        cid = 0;
        type = 0;
        exp = null;
        assertEquals(exp, studentServiceImpl.getHomeworks(sid, cid, type));

        // 获取所有课程的所有作业
        sid = 64;
        cid = 128;
        type = 3;
        exp = new ArrayList<>();
        exp.add(homework1);
        exp.add(homework2);
        assertEquals(exp, studentServiceImpl.getHomeworks(sid, cid, type));

        // 按照课程查找但是课程不存在
        sid = 64;
        cid = 0;
        type = 1;
        exp = null;
        assertEquals(exp, studentServiceImpl.getHomeworks(sid, cid, type));

        // 查找某课程所有作业
        sid = 64;
        cid = 128;
        type = 0;
        exp = new ArrayList<>();
        exp.add(homework1);
        exp.add(homework2);
        assertEquals(exp, studentServiceImpl.getHomeworks(sid, cid, type));

        // 查找某课程未完成作业
        sid = 64;
        cid = 128;
        type = 1;

        exp = studentServiceImpl.getHomeworks(sid, cid, type);
        type = 2;
        exp = studentServiceImpl.getHomeworks(sid, cid, type);
    }

    @Test
    void getHomeworkDetail() {
        int hid;
        Homework exp;

        hid = 1;
        exp = new Homework("HomeworkName1", new Date(1609931794),
                new Date(2022, 12, 10), "Content1", "Course128"); // Id = 1
        exp.setId(1);
        assertEquals(exp, studentServiceImpl.getHomeworkDetail(hid));
    }

    @Test
    void handInHomework() {
        int exp;
        HandInHomework homework;

        // 不存在用户
        homework = new HandInHomework(63, 1, "XMsAnswer", "");
        exp = -1;
        assertEquals(exp, studentServiceImpl.handInHomework(homework));

        // 作业不存在
        homework = new HandInHomework(64, 0, "XMsAnswer", "");
        exp = -1;
        assertEquals(exp, studentServiceImpl.handInHomework(homework));

        // 正常第一次提交
        homework = new HandInHomework(128, 1, "XZsAnswer", "");
        exp = 0;
        assertEquals(exp, studentServiceImpl.handInHomework(homework));

        // 正常重复提交
        homework = new HandInHomework(64, 1, "XMsAnswer", "");
        exp = 2;
        assertEquals(exp, studentServiceImpl.handInHomework(homework));

        // 超时提交
        homework = new HandInHomework(128, 3, "XZsAnswer", "");
        exp = 1;
        assertEquals(exp, studentServiceImpl.handInHomework(homework));
    }

    @Test
    void getGrade() {
        int sid;
        int cid;
        float exp;

        // 学生不存在
        sid = 0;
        cid = 128;
        exp = 0;
        assertEquals(exp, studentServiceImpl.getGrade(sid, cid));

        // 学生存在
        sid = 64;
        cid = 128;
        exp = 90;
        assertEquals(exp, studentServiceImpl.getGrade(sid, cid));

        // 学生未提交过作业
        sid = 128;
        cid = 256;
        exp = 0;
        assertEquals(exp, studentServiceImpl.getGrade(sid, cid));
    }
}