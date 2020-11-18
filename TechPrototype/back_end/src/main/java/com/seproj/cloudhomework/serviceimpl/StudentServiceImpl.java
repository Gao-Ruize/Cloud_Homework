package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.*;
import com.seproj.cloudhomework.entity.*;
import com.seproj.cloudhomework.service.StudentService;
import com.seproj.cloudhomework.utils.Course.CourseDetail;
import com.seproj.cloudhomework.utils.Homework.HandInHomework;
import org.springframework.beans.factory.annotation.Autowired;

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
        User teacher = userdao.findUserById(course.getId());
        if(teacher.getRole() != 1){
            // 若用户身份不是教师（一般情况不会出现）
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
                    continue;
                }
                HomeworkOfOneCourse = homeworkdao.findHomeworkByCourseId(course.getCourseId());
                for(Homework homework:HomeworkOfOneCourse){
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
                if((stuHW = studenthomeworkdao.findStudentHomeworkByHomeworkIdAndStudentId(homework.getId(), student.getUserId())) != null){
                    submittedHomework.add(homework);
                    continue;
                }
                else{
                    unSubmittedHomework.add(homework);
                    continue;
                }
            }
            if(type == 1){
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
        studenthomeworkdao.saveOrUpdate(new StudentHomework(new Date(),
                homework.getHid(),
                -1,
                homework.getContent(),
                homework.getPicture(),
                stu.getUserId()));

        if(hw.getDeadline().compareTo(submitDate) < 0){
            // 超时
            return 1;
        }
        else {
            return 0;
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
            if(homework.getGrade() < 0){
                continue;
            }
            tot_grade += homework.getGrade();
            count++;
        }
        return (float)tot_grade / count;
    }
}
