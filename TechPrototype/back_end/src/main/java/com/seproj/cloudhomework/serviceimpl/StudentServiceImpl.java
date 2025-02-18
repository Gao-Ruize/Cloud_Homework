package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.*;
import com.seproj.cloudhomework.entity.*;
import com.seproj.cloudhomework.service.StudentService;
import com.seproj.cloudhomework.utils.Course.CourseDetail;
import com.seproj.cloudhomework.utils.Homework.HandInHomework;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 类 {@code StudentServiceImpl} 负责处理和学生的课程、作业相关的业务.
 *
 * <p>主要包括学生获取自己所上的课程及其详情、某课所有的作业及详情、提交作业等功能</p>
 *
 * @author Gao-Ruize
 * @since 2020/11/18
 */
@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private UserDao userdao;
    @Autowired
    private CourseDao coursedao;
    @Autowired
    private HomeworkDao homeworkdao;
    @Autowired
    private StudentHomeworkDao studenthomeworkdao;
    @Autowired
    private InstructDao instructdao;

    @Override
    public List<Course> getCoursesBySid(int sid) {
        User stu;
        if((stu = userdao.findUserById(sid)) == null){
            return null;
        }
        List<Instruct> instructs = instructdao.findInstructByStudentId(stu.getUserId());
        List<Course> courseList = new ArrayList<>();
        Course course;
        for(Instruct ins:instructs){
            if((course = coursedao.findCourseById(ins.getCourseId())) != null){
                int Uid = course.getTeacherId();
                String teacherName = userdao.findUserById(Uid).getName();
                course.setTeacherName(teacherName);
                courseList.add(course);
            }
        }
        return courseList;
    }

    @Override
    public CourseDetail getCourseDetail(int cid) {
        Course course;
        if((course = coursedao.findCourseById(cid)) == null){
            return null;
        }
        User teacher = userdao.findUserById(course.getTeacherId());

        if(teacher == null || teacher.getRole() != 1){
            // 若用户身份不是教师或用户不存在（一般情况不会出现）
            return null;
        }
        teacher.getUsername();
        return new CourseDetail(course.getId(),
                course.getName(),
                course.getCourseId(),
                course.getTeacherId(),
                course.getStatus(),
                teacher.getName());
    }

    @Override
    public List<Homework> getHomeworks(int sid, int cid, int type) {
        User student;
        if((student = userdao.findUserById(sid)) == null){
            return null;
        }
        if(type == 3){
            // 获取所有课程的所有作业
            // TODO：应对所有按发布或截止时间进行排序
            List<Homework> result = new ArrayList<>();
            List<Instruct> instructList = instructdao.findInstructByStudentId(student.getUserId());
            Course course;
            List<Homework> HomeworkOfOneCourse = new ArrayList<>();
            for(Instruct instruct:instructList){
                if((course = coursedao.findCourseById(instruct.getCourseId())) == null){
                    // 找不到这门课
                    continue;
                }
                HomeworkOfOneCourse = homeworkdao.findHomeworkByCourseId(course.getCourseId());
                for(Homework homework:HomeworkOfOneCourse){
                    homework.setCourseName(course.getName());
                    StudentHomework SH = studenthomeworkdao.findStudentHomeworkByHomeworkIdAndStudentId(homework.getId(), student.getUserId());
                    if(SH == null || SH.getCommitedTime() == null){
                        homework.setType(0);
                    }else{
                        homework.setType(1);
                    }
                    result.add(homework);
                }
            }
            return result;
        }

        Course course;
        if((course = coursedao.findCourseById(cid)) == null){
            return null;
        }
        List<Homework> homeworkList = homeworkdao.findHomeworkByCourseId(course.getCourseId());
        if(type == 1 || type == 2){
            List<Homework> submittedHomework = new ArrayList<>();
            List<Homework> unSubmittedHomework = new ArrayList<>();
            StudentHomework stuHW;
            for(Homework homework:homeworkList){
                homework.setCourseName(course.getName());
                if((stuHW = studenthomeworkdao.findStudentHomeworkByHomeworkIdAndStudentId(homework.getId(), student.getUserId())) == null){
                    // 未完成（未找到studenthomework）
                    homework.setType(0);
                    unSubmittedHomework.add(homework);
                    continue;
                }
                else{
//                    unSubmittedHomework.add(homework);
//                    continue;

                    if(stuHW.getCommitedTime() == null){
                        // 未提交
                        homework.setType(0);
                        unSubmittedHomework.add(homework);
                    }
                    else{
                        // 已提交
                        Date date = new Date();
                        if(date.compareTo(stuHW.getCommitedTime()) == 1){
                            // 已超时
                            homework.setType(2);
                        }else{
                            // 正常提交，未超时
                            homework.setType(1);
                        }
                        submittedHomework.add(homework);
                    }
                    continue;
                }
            }
            if(type == 2){
                return submittedHomework;
            }else{
                return unSubmittedHomework;
            }
        }
        // 默认情况，即type == 0
        return homeworkList;
    }

    @Override
    public Homework getHomeworkDetail(int hid) {
        return homeworkdao.findHomeworkById(hid);
    }

    @Override
    public int handInHomework(HandInHomework homework) {
        User stu;
        if((stu = userdao.findUserById(homework.getSid())) == null){
            return -1;
        }

        Homework hw;
        if((hw = homeworkdao.findHomeworkById(homework.getHid())) == null){
            return -1;
        }
        Date submitDate = new Date();
//        System.out.println(submitDate.toString());
//        System.out.println(hw.getDeadline().toString());
        StudentHomework stu_hw;
//        if((stu_hw = studenthomeworkdao.findStudentHomeworkByHomeworkIdAndStudentId(homework.getHid(), stu.getUserId())) == null){
//            stu_hw = new StudentHomework();
//        }
        stu_hw = studenthomeworkdao.findStudentHomeworkByHomeworkIdAndStudentId(homework.getHid(), stu.getUserId());
        int flag = 0;
        if(stu_hw == null) {
            flag = 1;
            stu_hw = new StudentHomework();
        }
//        studenthomeworkdao.saveOrUpdate(new StudentHomework(new Date(),
//                homework.getHid(),
//                -1,
//                homework.getContent(),
//                homework.getPicture(),
//                stu.getUserId()));
        stu_hw.setCommitedTime(new Date());
        stu_hw.setHomeworkId(homework.getHid());
        stu_hw.setGrade(0);
        stu_hw.setContent(homework.getContent());
        stu_hw.setPicture(homework.getPicture());
        stu_hw.setStudentId(stu.getUserId());
        studenthomeworkdao.saveOrUpdate(stu_hw);
        if(hw.getDeadline().compareTo(submitDate) < 0){
            // 超时
            return 1;
        }
        else {
            if(flag == 0)
                return 2;   // 覆盖提交
            return 0; // 第一次提交
        }
    }

    // TODO： 若StudentHomework数据库修改增加status成员，该方法实现需要修改
    @Override
    public float getGrade(int sid, int cid) {
        User stu;
        if((stu = userdao.findUserById(sid)) == null){
            return 0;
        }

        List<StudentHomework> homeworkList = studenthomeworkdao.findStudentHomeworkByStudentId(stu.getUserId());

        int tot_grade = 0;
        int count = 0;
        for(StudentHomework homework:homeworkList){
            if(homework.getCommitedTime() == null){
                continue;
            }
            tot_grade += homework.getGrade();
            count++;
        }

        if(count == 0){
            return 0;
        }else{
            return (float)tot_grade / count;
        }
    }
}

