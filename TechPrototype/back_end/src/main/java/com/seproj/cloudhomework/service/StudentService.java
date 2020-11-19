package com.seproj.cloudhomework.service;

import com.seproj.cloudhomework.entity.Course;
import com.seproj.cloudhomework.entity.Homework;
import com.seproj.cloudhomework.utils.Course.CourseDetail;
import com.seproj.cloudhomework.utils.Homework.HandInHomework;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>类 {@code StudentService} 负责处理与学生的课程、作业相关的业务</p>
 *
 * <p>主要包括学生获取自己所上的课程及其详情、某课所有的作业及详情、提交作业等功能</p>
 *
 * @author Gao-Ruize
 * @since 2020/11/18 version1.0
 * @version 1.0
 */
@Service
public interface StudentService {
    /**
     * <p>获取某个学生相关的所有课程</p>
     *
     * @param sid 学生的id
     * @return 课程列表
     */
    List<Course> getCoursesBySid(int sid);

    /**
     * <p>获取一门课的详细信息</p>
     *
     * @param cid 课程的id
     * @return 课程详细信息
     */
    CourseDetail getCourseDetail(int cid);

    /**
     * <p>获取一门课的作业列表</p>
     *
     * @param sid 学生的用户id
     * @param cid 课程的id
     * @param type
     * <pre>
     * 获取作业的类型
     * 0：该课程所有作业（默认）
     * 1：该课程未完成作业
     * 2：该课程已完成作业
     * 3：所有课程所有作业
     * </pre>
     * @return 作业列表
     */
    List<Homework> getHomeworks(int sid, int cid, int type);

    /**
     * <p>获取某次作业详细内容</p>
     *
     * @param hid 作业id
     * @return 作业详细内容
     */
    Homework getHomeworkDetail(int hid);

    /**
     * <p>提交作业</p>
     *
     * @param homework 被提交的作业
     * @return <pre>
     * 0：提交成功；
     * 1：作业超出截止日期；
     * -1：提交失败
     * </pre>
     */
    int handInHomework(HandInHomework homework);

    /**
     * <p>学生获取一门课的作业平均分</p>
     *
     * @param sid 学生id
     * @param cid 课程id
     * @return 该学生在该门课程已批改作业的平均分
     */
    float getGrade(int sid, int cid);
}
