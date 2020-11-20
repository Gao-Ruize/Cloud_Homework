package com.seproj.cloudhomework.service;

import com.seproj.cloudhomework.entity.Course;
import com.seproj.cloudhomework.entity.Homework;
import com.seproj.cloudhomework.entity.StudentHomework;
import com.seproj.cloudhomework.entity.User;
import com.seproj.cloudhomework.utils.Course.CourseDetail;
import com.seproj.cloudhomework.utils.Course.UpdateCourseForm;
import com.seproj.cloudhomework.utils.Homework.CreateHomeworkForm;
import com.seproj.cloudhomework.utils.Homework.GradeStatistic;
import com.seproj.cloudhomework.utils.Homework.StuHomeworkBrief;
import com.seproj.cloudhomework.utils.Homework.UpdateHomeworkForm;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>类 {@code TeacherService} 负责处理与教师的课程、作业相关的业务</p>
 *
 * <p>课程方面主要包括教师开设/更新/删除课程以及获取课程列表、添加学生到课程功能，
 * 作业方面主要包括创建/更新/读取作业以及评分、查看成绩等功能.</p>
 *
 * @author Gao-Ruize
 * @since 2020/11/19 version1.0
 * @version 1.0
 */
@Service
public interface TeacherService {
    /**
     * <p>教师申请新的课程</p>
     *
     * @param newCourse 申请新课程的信息
     * @return
     * <pre>
     * 0：成功
     * -1：未找到申请人对应的用户或该用户不是教师
     * </pre>
     */
    int createCourse(UpdateCourseForm newCourse);

    /**
     * <p>教师更新课程信息</p>
     *
     * @param newCourse 更新课程的信息
     * @return
     * <pre>
     * 0：成功
     * -1：未找到申请人对应的用户或该用户不是教师
     * </pre>
     */
    int updateCourse(UpdateCourseForm newCourse);

    /**
     * <p>获取和某教师相关的所有课程</p>
     *
     * @param tid 教师的工号
     * @return 课程列表
     */
    List<Course> getAllCourseByTid(String tid);

    /**
     * <p>获取某课程的详细信息</p>
     *
     * @param cid 课程id
     * @return 课程详情
     */
    CourseDetail getCourseDetail(int cid);

    /**
     * <p>删除某课程</p>
     *
     * <p>version 1.0暂未实现</p>
     *
     * @param c_id 课程id
     * @return 执行结果
     */
    int deleteCourse(int c_id);

    /**
     * <p>获取所有学生</p>
     *
     * @return 所有的学生列表
     */
    List<User> getAllStudents();

    /**
     * <p>教师拉取学生加入课程</p>
     *
     * @param c_id 课程id
     * @param stu_list 学生学号列表
     * @return
     * <pre>
     * 0：添加成功
     * -1：未找到课程
     * 1：存在非法学号
     * </pre>
     */
    int addStudents(int c_id, List<String> stu_list);


    int addAStudent(int cid, String sid);




    /**
     * <p>教师发布新的作业</p>
     *
     * @param newhomework 新作业内容
     * @return 0表示成功
     */
    int createHomework(CreateHomeworkForm newhomework);

    /**
     * <p>教师更新作业内容</p>
     *
     * @param newhomework 新的作业内容
     * @return 0表示成功
     */
    int updateHomework(UpdateHomeworkForm newhomework);

    /**
     * <p>统计某一次作业的情况</p>
     *
     * <p>包括某次作业的总人数、提交人数、已提交部分的平均分、最高分、最低分</p>
     *
     * @param c_id 课程id
     * @param courseId 课程编号
     * @param h_id 作业id
     * @return 作业统计情况
     */
    GradeStatistic getGrade(int c_id, String courseId, int h_id);

    /**
     * <p>获取一门课所有作业</p>
     *
     * @param c_id 课程id
     * @return 该门课的所有作业列表
     */
    List<Homework> getAllHomework(int c_id);

    /**
     * <p>教师获取自己执教课程的所有作业</p>
     *
     * @param tid 教师id
     * @return 作业列表
     */
    List<Homework> getHomeworksByTid(int tid);

    /**
     * <p>获取某次作业学生提交列表</p>
     *
     * @param c_id 课程id
     * @param courseId 课程编号
     * @param h_id 作业id
     * @return 学生提交的简要信息列表
     */
    List<StuHomeworkBrief> getStuHomeworkList(int c_id, String courseId, int h_id);

    /**
     * <p>获取某一作业某一学生的提交内容</p>
     *
     * @param st_id 学生提交内容的id
     * @return 学生的提交内容
     */
    StudentHomework getStuHomework(int st_id);

    /**
     * <p>给学生提交的作业内容评分</p>
     *
     * @param sh_id 学生提交内容的id
     * @param grade 得分
     * @return
     * <pre>
     * 0：成功
     * -1：未找到该次提交内容
     * </pre>
     */
    int rateStuHomework(int sh_id, int grade);

}
