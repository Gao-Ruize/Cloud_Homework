package com.seproj.cloudhomework.serviceimpl;


import com.seproj.cloudhomework.dao.*;
import com.seproj.cloudhomework.entity.*;
import com.seproj.cloudhomework.utils.Course.CourseDetail;
import com.seproj.cloudhomework.utils.Course.UpdateCourseForm;
import com.seproj.cloudhomework.utils.Homework.CreateHomeworkForm;
import com.seproj.cloudhomework.utils.Homework.GradeStatistic;
import com.seproj.cloudhomework.utils.Homework.StuHomeworkBrief;
import com.seproj.cloudhomework.utils.Homework.UpdateHomeworkForm;
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
class TeacherServiceImplTest {
    @Autowired
    private TeacherServiceImpl teacherServiceImpl;

    @MockBean
    private CourseDao courseDao;
    @MockBean
    private UserDao userDao;
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
        User UserMrLi = new User("MrLi", "LiPassword",
                "MrLi", "22222222",
                "MrLi@sjtu.edu.cn", "33333333", 1);     // id = 512
        UserMrLi.setId(512);

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
                        }else if(invocation.getArgument(0).equals("MrLi")){
                            return UserMrLi;
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
                        }else if(invocationOnMock.getArgument(0).equals("22222222")){
                            return UserMrLi;
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
                        }else if(invocationOnMock.getArgument(0).equals(512)){
                            return UserMrLi;
                        }
                        else{
                            return null;
                        }
                    }
                }
        );
        Mockito.when(userDao.findUserByRole(Mockito.anyInt())).thenAnswer(
                new Answer<List<User>>(){
                    @Override
                    public List<User> answer(InvocationOnMock invocationOnMock) throws Throwable {
                        List<User> retList = new ArrayList<>();
                        if(invocationOnMock.getArgument(0).equals(0)){
                            retList.add(UserXiaoMing);
                            retList.add(UserXiaoZhang);
                        }else if(invocationOnMock.getArgument(0).equals(0)){
                            retList.add(UserMrWang);
                            retList.add(UserMrLi);
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
        Course course3 = new Course("CourseName3", "Course512",
                "CourseInfo3", 512, 1);
        course3.setId(512);

        Mockito.when(courseDao.findCourseById(Mockito.anyInt())).thenAnswer(
                new Answer<Course>(){
                    @Override
                    public Course answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals(128)){
                            return course1;
                        }else if(invocationOnMock.getArgument(0).equals(256)){
                            return course2;
                        } else if (invocationOnMock.getArgument(0).equals(512)){
                            return course3;
                        } else {
                            return null;
                        }
                    }
                }
        );
        Mockito.when(courseDao.findCourseByCourseId(Mockito.anyString())).thenAnswer(
                new Answer<Course>(){
                    @Override
                    public Course answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals("Course128")){
                            return course1;
                        }else if(invocationOnMock.getArgument(0).equals("Course256")){
                            return course2;
                        }else if(invocationOnMock.getArgument(0).equals("Course512")){
                            return course3;
                        }
                        else{
                            return null;
                        }
                    }
                }
        );
        Mockito.when(courseDao.findCoursesByTeacherId(Mockito.anyInt())).thenAnswer(
                new Answer<List<Course>>(){
                    @Override
                    public List<Course> answer(InvocationOnMock invocationOnMock) throws Throwable {
                        List<Course> retList = new ArrayList<>();
                        if(invocationOnMock.getArgument(0).equals(256)){
                            retList.add(course1);
                            retList.add(course2);
                        }else if(invocationOnMock.getArgument(0).equals(512)){
                            retList.add(course3);
                        }
                        return retList;
                    }
                }
        );

        // Mock for InstructDao
        Instruct instruct1 = new Instruct(128, "518123456789");
        Instruct instruct2 = new Instruct(256, "518987654321");
        Instruct instruct3 = new Instruct(128, "518987654321");


        Mockito.when(instructDao.findDistinctByCourseIdAndStudentId(Mockito.anyInt(), Mockito.anyString())).thenAnswer(
                new Answer<Instruct>(){
                    @Override
                    public Instruct answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals(128) &&
                                invocationOnMock.getArgument(1).equals("518123456789")){
                            return instruct1;
                        }else if(invocationOnMock.getArgument(0).equals(128) &&
                                invocationOnMock.getArgument(1).equals("518987654321")){
                            return instruct3;
                        }else if(invocationOnMock.getArgument(0).equals(256) &&
                                invocationOnMock.getArgument(1).equals("518987654321")){
                            return instruct2;
                        }
                        else return null;
                    }
                }
        );
        Mockito.when(instructDao.findInstructByCourseId(Mockito.anyInt())).thenAnswer(
                new Answer<List<Instruct>>(){
                    @Override
                    public List<Instruct> answer(InvocationOnMock invocationOnMock) throws Throwable {
                        List<Instruct> retList = new ArrayList<>();
                        if(invocationOnMock.getArgument(0).equals(128)){
                            retList.add(instruct1);
                            retList.add(instruct3);
                        }else if(invocationOnMock.getArgument(0).equals(256)){
                            retList.add(instruct2);
                        }
                        return retList;
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
        XM_HW1.setId(1);
        StudentHomework XZ_HW1 = new StudentHomework(new Date(1609931794), 1,
                10, "Content1", "", "518987654321");
        XZ_HW1.setId(2);
        StudentHomework XZ_HW3 = new StudentHomework(new Date(1609931794), 3,
                0, "Content3", "", "518123456789");
        XZ_HW3.setId(3);

        Mockito.when(studentHomeworkDao.findStudentHomeworkByHomeworkIdAndStudentId(Mockito.anyInt(), Mockito.anyString())).thenAnswer(
                new Answer<StudentHomework>(){
                    @Override
                    public StudentHomework answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals(1)){
                            if(invocationOnMock.getArgument(1).equals("518123456789")){
                                return XM_HW1;
                            }
                            else if(invocationOnMock.getArgument(1).equals("518987654321")){
                                return XZ_HW1;
                            }
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
                            retList.add(XZ_HW1);
                            retList.add(XZ_HW3);
                        }
                        else{
                            retList = null;
                        }
                        return retList;
                    }
                }
        );
        Mockito.when(studentHomeworkDao.findStudentHomeworkByHomeworkId(Mockito.anyInt())).thenAnswer(
                new Answer<List<StudentHomework>>(){
                    @Override
                    public List<StudentHomework> answer(InvocationOnMock invocationOnMock) throws Throwable {
                        List<StudentHomework> retList = new ArrayList<>();
                        if(invocationOnMock.getArgument(0).equals(1)){
                            retList.add(XM_HW1);
                            retList.add(XZ_HW1);
                        }else if(invocationOnMock.getArgument(0).equals(3)){
                            retList.add(XZ_HW3);
                        }
                        return retList;
                    }
                }
        );
        Mockito.when(studentHomeworkDao.findStudentHomeworkById(Mockito.anyInt())).thenAnswer(
                new Answer<StudentHomework>(){
                    @Override
                    public StudentHomework answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals(1)){
                            return XM_HW1;
                        }else if(invocationOnMock.getArgument(0).equals(2)){
                            return XZ_HW1;
                        }else if(invocationOnMock.getArgument(0).equals(3)){
                            return XZ_HW3;
                        }
                        else{
                            return null;
                        }
                    }
                }
        );
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void createCourse() {
        int exp;
        UpdateCourseForm newCourse;

        // 用户不存在
        newCourse = new UpdateCourseForm("newCourseName", "newCourseId",
                "newCourseInfo", "NotExistTeacher");
        exp = -1;
        assertEquals(exp, teacherServiceImpl.createCourse(newCourse));

        // 用户身份不是教师
        newCourse = new UpdateCourseForm("newCourseName", "newCourseId",
                "newCourseInfo", "518987654321");
        exp = -1;
        assertEquals(exp, teacherServiceImpl.createCourse(newCourse));

        // 正确填写
        newCourse = new UpdateCourseForm("newCourseName", "newCourseId",
                "newCourseInfo", "11111111");
        exp = 0;
        assertEquals(exp, teacherServiceImpl.createCourse(newCourse));
    }

    @Test
    void updateCourse() {
        int exp;
        UpdateCourseForm newCourse;

        // 用户不存在
        newCourse = new UpdateCourseForm("newCourseName", "Course128",
                "newCourseInfo", "NotExistTeacher");
        exp = -1;
        assertEquals(exp, teacherServiceImpl.updateCourse(newCourse));

        // 用户身份不是教师
        newCourse = new UpdateCourseForm("newCourseName", "Course128",
                "newCourseInfo", "518987654321");
        exp = -1;
        assertEquals(exp, teacherServiceImpl.updateCourse(newCourse));

        // 课程不存在
        newCourse = new UpdateCourseForm("newCourseName", "Course000",
                "newCourseInfo", "11111111");
        exp = -1;
        assertEquals(exp, teacherServiceImpl.updateCourse(newCourse));

        // 正确填写
        newCourse = new UpdateCourseForm("newCourseName", "Course128",
                "newCourseInfo", "11111111");
        exp = 0;
        assertEquals(exp, teacherServiceImpl.updateCourse(newCourse));
    }

    @Test
    void getAllCourseByTid() {
        List<Course> exp;
        String tid;
        Course course1 = new Course("CourseName1", "Course128",
                "CourseInfo1", 256, 1); // id = 128
        course1.setId(128);
        Course course2 = new Course("CourseName2", "Course256",
                "CourseInfo2", 256, 1); // id = 256
        course2.setId(256);

        // 未存在用户
        tid = "NotExistUser";
        exp = null;
        assertEquals(exp, teacherServiceImpl.getAllCourseByTid(tid));

        // 用户并非学生
        tid = "518123456789";
        exp = null;
        assertEquals(exp, teacherServiceImpl.getAllCourseByTid(tid));

        // 正常获取
        tid = "11111111";
        exp = new ArrayList<>();
        exp.add(course1);
        exp.add(course2);
        assertEquals(exp, teacherServiceImpl.getAllCourseByTid(tid));
    }

    @Test
    void getCourseDetail() {
        CourseDetail exp;
        int cid;

        // 不存在的课程
        exp = null;
        cid = 0;
        assertEquals(exp, teacherServiceImpl.getCourseDetail(cid));

        // 正常情况
        exp = new CourseDetail(128, "CourseName1", "Course128",
                256, 1, "MrWang");
        cid = 128;
        assertEquals(exp, teacherServiceImpl.getCourseDetail(cid));
    }

    @Test
    void deleteCourse() {
        // do nothing
    }

    @Test
    void getAllStudents() {
        User UserXiaoMing = new User("XiaoMing", "XMsPassword",
                "XiaoMing", "518123456789",
                "XiaoMing@sjtu.edu.cn", "123456789", 0);    // id = 64
        UserXiaoMing.setId(64);
        User UserXiaoZhang = new User("XiaoZhang", "XZsPassword",
                "XiaoZhang", "518987654321",
                "XiaoZhang@sjtu.edu.cn", "987654321", 0);   // id = 128
        UserXiaoZhang.setId(128);
        List<User> exp = new ArrayList<>();
        exp.add(UserXiaoMing);
        exp.add(UserXiaoZhang);
        assertEquals(exp, teacherServiceImpl.getAllStudents());
    }

    @Test
    void addStudents() throws Exception {
        int exp;
        int c_id;
        List<String> stu_list;

        // 不存在的课程
        exp = -1;
        c_id = 0;
        stu_list = new ArrayList<>();
        assertEquals(exp, teacherServiceImpl.addStudents(c_id, stu_list));

        // 全部添加成功
        exp = 0;
        c_id = 128;
        stu_list.add("518123456789");
        stu_list.add("518987654321");
        assertEquals(exp, teacherServiceImpl.addStudents(c_id, stu_list));

        // 存在非法学号
        exp = 1;
        c_id = 128;
        stu_list.add("00000000");
        stu_list.add("518987654321");
        assertEquals(exp, teacherServiceImpl.addStudents(c_id, stu_list));
    }

    @Test
    void addAStudent() throws Exception {
        int exp;
        int cid;
        String sid;

        // 课程不存在
        exp = -1;
        cid = 0;
        sid = "518123456789";
        assertEquals(exp, teacherServiceImpl.addAStudent(cid, sid));

        // 未找到用户
        exp = 1;
        cid = 128;
        sid = "00000000";
        assertEquals(exp, teacherServiceImpl.addAStudent(cid, sid));

        // 用户不是学生
        exp = 1;
        cid = 128;
        sid = "11111111";
        assertEquals(exp, teacherServiceImpl.addAStudent(cid, sid));

        // 学生已经在该课程中
        exp = 2;
        cid = 128;
        sid = "518123456789";
        assertEquals(exp, teacherServiceImpl.addAStudent(cid, sid));

        // 添加成功
        exp = 0;
        cid = 256;
        sid = "518123456789";
        assertEquals(exp, teacherServiceImpl.addAStudent(cid, sid));
    }

    @Test
    void createHomework() throws Exception {
        int exp;
        CreateHomeworkForm newhomework;

        exp = 0;
        newhomework = new CreateHomeworkForm("Course128", "HomeworkName",
                "Content", new Date(), new Date());
        assertEquals(exp, teacherServiceImpl.createHomework(newhomework));
    }

    @Test
    void updateHomework() {
        int exp;
        UpdateHomeworkForm newhomework;

        exp = 0;
        newhomework = new UpdateHomeworkForm(1, "11111111", "Course128", "newName",
                "newContent", new Date(), new Date());
        assertEquals(exp, teacherServiceImpl.updateHomework(newhomework));
    }

    @Test
    void getGrade() {
        GradeStatistic exp;
        int c_id;
        String courseId;
        int h_id;

        exp = new GradeStatistic(50, 2, 2, 90, 10);
        c_id = 128;
        courseId = "Course128";
        h_id = 1;
        assertEquals(exp, teacherServiceImpl.getGrade(c_id, courseId, h_id));
    }

    @Test
    void getAllHomework() {
        List<Homework> exp;
        int c_id;

        // 不存在的课程
        exp = null;
        c_id = 0;
        assertEquals(exp, teacherServiceImpl.getAllHomework(c_id));

        // 正常获取
        exp = new ArrayList<>();
        Homework homework1 = new Homework("HomeworkName1", new Date(1609931794),
                new Date(2022, 12, 10), "Content1", "Course128"); // Id = 1
        homework1.setId(1);
        Homework homework2 = new Homework("HomeworkName2", new Date(1609931794),
                new Date(1609931795), "Content2", "Course128"); // Id = 2
        homework2.setId(2);
        exp.add(homework1);
        exp.add(homework2);
        c_id = 128;
        assertEquals(exp, teacherServiceImpl.getAllHomework(c_id));
    }

    @Test
    void getHomeworksByTid() {
        List<Homework> exp;
        int tid;

        // 教师不存在
        exp = null;
        tid = 0;
        assertEquals(exp, teacherServiceImpl.getHomeworksByTid(tid));

        // 正常获取
        exp = new ArrayList<>();
        tid = 256;
        Homework homework1 = new Homework("HomeworkName1", new Date(1609931794),
                new Date(2022, 12, 10), "Content1", "Course128"); // Id = 1
        homework1.setId(1);
        Homework homework2 = new Homework("HomeworkName2", new Date(1609931794),
                new Date(1609931795), "Content2", "Course128"); // Id = 2
        homework2.setId(2);
        Homework homework3 = new Homework("HomeworkName3", new Date(1609931794),
                new Date(1609931795), "Content3", "Course256"); // Id = 3
        homework3.setId(3);
        exp.add(homework1);
        exp.add(homework2);
        exp.add(homework3);
        assertEquals(exp, teacherServiceImpl.getHomeworksByTid(tid));
    }

    @Test
    void getStuHomeworkList() {
        List<StuHomeworkBrief> exp;
        int c_id = 0;
        String courseId = "";
        int h_id;
        // c_id 和 courseId没有实际作用

        StuHomeworkBrief StuHomework1 = new StuHomeworkBrief(1, "518123456789",
                "XiaoMing", 90);
        StuHomeworkBrief StuHomework2 = new StuHomeworkBrief(2, "518987654321",
                "XiaoZhang", 10);
        exp = new ArrayList<>();
        exp.add(StuHomework1);
        exp.add(StuHomework2);
        h_id = 1;
        assertEquals(exp, teacherServiceImpl.getStuHomeworkList(c_id, courseId, h_id));
    }

    @Test
    void getAHomeworkToRate() {
        StudentHomework exp;
        int hid;


    }

    @Test
    void getStuHomework() {
        StudentHomework exp;
        int sh_id;

        exp = new StudentHomework(new Date(1609931794), 1,
                90, "Content1", "", "518123456789");
        exp.setId(1);
        sh_id = 1;
        assertEquals(exp, teacherServiceImpl.getStuHomework(sh_id));

        exp = null;
        sh_id = 0;
        assertEquals(exp, teacherServiceImpl.getStuHomework(sh_id));
    }

    @Test
    void rateStuHomework() throws Exception {
        int exp;
        int sh_id;
        int grade;

        // 作业不存在
        exp = -1;
        sh_id = 0;
        grade = 0;
        assertEquals(exp, teacherServiceImpl.rateStuHomework(sh_id, grade));

        // 正常批改
        exp = 0;
        sh_id = 1;
        grade = 100;
        assertEquals(exp, teacherServiceImpl.rateStuHomework(sh_id, grade));
    }
}