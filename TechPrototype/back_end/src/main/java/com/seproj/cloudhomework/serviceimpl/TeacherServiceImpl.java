package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.*;
import com.seproj.cloudhomework.entity.*;
import com.seproj.cloudhomework.service.TeacherService;
import com.seproj.cloudhomework.utils.Course.CourseDetail;
import com.seproj.cloudhomework.utils.Course.UpdateCourseForm;
import com.seproj.cloudhomework.utils.Homework.CreateHomeworkForm;
import com.seproj.cloudhomework.utils.Homework.GradeStatistic;
import com.seproj.cloudhomework.utils.Homework.StuHomeworkBrief;
import com.seproj.cloudhomework.utils.Homework.UpdateHomeworkForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {
    @Autowired
    private CourseDao courseDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private HomeworkDao homeworkDao;
    @Autowired
    private StudentHomeworkDao studentHomeworkDao;
    @Autowired
    private InstructDao instructDao;

    @Override
    public int createCourse(UpdateCourseForm newCourse) {
        User teacher;
        if((teacher = userDao.findUserByUserId(newCourse.getTeacherId())) == null || teacher.getRole() != 1){
            // 未找到该用户或该用户并非教师
            return -1;
        }
        Course course = new Course(newCourse.getName(),
                newCourse.getCourseId(),
                newCourse.getCourseInfo(),
                teacher.getId(),
                1);
        courseDao.saveOrUpdate(course);
        return 0;
    }

    @Override
    public int updateCourse(UpdateCourseForm newCourse) {
        User teacher;
        Course course;
        if((teacher = userDao.findUserByUserId(newCourse.getTeacherId())) == null || teacher.getRole() != 1){
            // 未找到该用户或该用户并非教师
            return -1;
        }
        if((course = courseDao.findCourseByCourseId(newCourse.getCourseId())) == null){
            // 未找到该课程信息
            return -1;
        }

        Course newcourse = new Course(newCourse.getName(),
                newCourse.getCourseId(),
                newCourse.getCourseInfo(),
                teacher.getId(),
                1);
        newcourse.setId(course.getId());
        courseDao.saveOrUpdate(course);
        return 0;
    }

    @Override
    public List<Course> getAllCourseByTid(String tid) {
        User teacher;
        if((teacher = userDao.findUserByUserId(tid)) == null || teacher.getRole() != 1){
            // 未找到该用户或该用户并非教师
            return null;
        }
        return courseDao.findCoursesByTeacherId(teacher.getId());
    }

    /**
     * <p>获取某课程的详细信息</p>
     *
     * @param cid 课程id
     * @return 课程详情
     */
    @Override
    public CourseDetail getCourseDetail(int cid) {
        Course course;
        if((course = courseDao.findCourseById(cid)) == null){
            return null;
        }
        User teacher = userDao.findUserById(course.getTeacherId());
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

    // TODO:删除课程暂未完成
    @Override
    public int deleteCourse(int c_id) {
        return 0;
    }

    /**
     * <p>获取所有学生</p>
     *
     * @return 所有的学生列表
     */
    @Override
    public List<User> getAllStudents() {
        return userDao.findUserByRole(0);
    }

    @Override
    public int addStudents(int c_id, List<String> stu_list) {
        int succ = 0;   // 添加成功：0
        Course course;
        if((course = courseDao.findCourseById(c_id)) == null){
            // 未找到该课程
            return -1;
        }
        User student;
        Instruct instr;
        for(String stu:stu_list){
            if((student = userDao.findUserByUserId(stu)) == null || student.getRole() != 0){
                // 该号码对应不到用户或者对应的用户不是学生
                succ = 1;
                continue;
            }
            if((instr = instructDao.findDistinctByCourseIdAndStudentId(course.getId(), stu)) != null){
                // 该学生已经在该课程中
                continue;
            }
            instr = new Instruct(c_id, stu);
            instructDao.saveOrUpdate(instr);
        }
        // 返回-1：未找到课程；返回0：添加成功；返回1：存在非法学号（部分添加成功）
        return succ;
    }

    @Override
    public int addAStudent(int cid, String sid) {
        Course course;
        if((course = courseDao.findCourseById(cid)) == null){
            // 未找到课程
            return -1;
        }
        User student;
        Instruct instr;
        if((student = userDao.findUserByUserId(sid)) == null){
            // 未找到用户
            return 1;
        }
        if(student.getRole() != 0){
            // 用户不是学生
            return 1;
        }
        if((instr = instructDao.findDistinctByCourseIdAndStudentId(course.getId(), sid)) != null){
            // 该学生已经在该课程中
            return 2;
        }
        instr = new Instruct(cid, sid);
        instructDao.saveOrUpdate(instr);
        return 0;
    }

    @Override
    public int createHomework(CreateHomeworkForm newhomework) {
        // TODO: 检测输入是否有效
        Homework homework = new Homework(newhomework.getName(),
                newhomework.getReleasetime(),
                newhomework.getDeadline(),
                newhomework.getContent(),
                newhomework.getCourseId());
        homeworkDao.saveOrUpdate(homework);
        List<Instruct> allStus = instructDao.findInstructByStudentId(newhomework.getCourseId());
        int hid = homework.getId();
        for(Instruct instr:allStus){
            StudentHomework SH = new StudentHomework();
            SH.setHomeworkId(hid);
            SH.setStudentId(instr.getStudentId());
            SH.setGrade(0);
            studentHomeworkDao.saveOrUpdate(SH);
        }

        return 0;
    }

    @Override
    public int updateHomework(UpdateHomeworkForm newhomework) {
        Homework homework = new Homework(newhomework.getName(),
                newhomework.getReleasetime(),
                newhomework.getDeadline(),
                newhomework.getContent(),
                newhomework.getCourseId());
        homework.setId(newhomework.getId());
        homeworkDao.saveOrUpdate(homework);
        return 0;
    }

    @Override
    public GradeStatistic getGrade(int c_id, String courseId, int h_id) {
        List<Instruct> instr_list = instructDao.findInstructByCourseId(c_id);
        int num_allstu = instr_list.size();

        GradeStatistic gradestat = new GradeStatistic();
        int tot_grade = 0;
        int num_ratedstu = 0;
        int num_submitedstu = 0;
        int max_grade = 0;
        int min_grade = 100;

        List<StudentHomework> stuHomework_list = studentHomeworkDao.findStudentHomeworkByHomeworkId(h_id);
        for(StudentHomework stuHomework:stuHomework_list){
            num_submitedstu++;
            if(stuHomework.getCommitedTime() == null){
                continue;
            }
            int grade = stuHomework.getGrade();
            num_ratedstu++;
            tot_grade += grade;
            if(grade < min_grade){
                min_grade = grade;
            }
            if(grade > max_grade){
                max_grade = grade;
            }
        }

        gradestat.setNum_allstu(num_allstu);
        gradestat.setNum_stu(num_submitedstu);
        if(num_ratedstu == 0){
            gradestat.setAvg_grade(0);
        }else{
            gradestat.setAvg_grade(tot_grade/num_ratedstu);
        }
        gradestat.setMax_grade(max_grade);
        gradestat.setMin_grade(min_grade);
        return gradestat;
    }

    @Override
    public List<Homework> getAllHomework(int c_id) {
        Course course;
        if((course = courseDao.findCourseById(c_id)) == null){
            return null;
        }

        return homeworkDao.findHomeworkByCourseId(course.getCourseId());
    }

    /**
     * <p>教师获取自己执教课程的所有作业</p>
     *
     * @param tid 教师id
     * @return 作业列表
     */
    @Override
    public List<Homework> getHomeworksByTid(int tid) {
        User teacher;
        if((teacher  = userDao.findUserById(tid)) == null){
            // 未找到该教师
            return null;
        }
        List<Course> courses = courseDao.findCoursesByTeacherId(tid);

        List<Homework> HwOfCourse;
        List<Homework> result = new ArrayList<>();
        for(Course course:courses){
            HwOfCourse = homeworkDao.findHomeworkByCourseId(course.getCourseId());
            for(Homework homework:HwOfCourse){
                result.add(homework);
            }
        }

        return result;
    }

    @Override
    public List<StuHomeworkBrief> getStuHomeworkList(int c_id, String courseId, int h_id) {
        List<StudentHomework> stuHW_list = studentHomeworkDao.findStudentHomeworkByHomeworkId(h_id);
        List<StuHomeworkBrief> stuHWBrief_list = new ArrayList<>();
        for(StudentHomework stuHW:stuHW_list){
            User stu;
            if((stu = userDao.findUserByUserId(stuHW.getStudentId())) == null){
                continue;
            }
            // TODO:未批改的作业此时仍然记为-1分
            stuHWBrief_list.add(new StuHomeworkBrief(stuHW.getId(),
                    stuHW.getStudentId(),
                    stu.getName(),
                    stuHW.getGrade()));
        }
        return stuHWBrief_list;
    }

    @Override
    public StudentHomework getAHomeworkToRate(int hid) {
        List<StudentHomework> stuHW_list = studentHomeworkDao.findStudentHomeworkByHomeworkId(hid);
        for(StudentHomework stuHW:stuHW_list){
            User stu;
            if((stu = userDao.findUserByUserId(stuHW.getStudentId())) == null){
                continue;
            }
            if(stuHW.getCommitedTime() == null){
                return stuHW;   // 找到一份未批改的作业
            }
        }
        return null;
    }

    @Override
    public StudentHomework getStuHomework(int sh_id) {
        return studentHomeworkDao.findStudentHomeworkById(sh_id);
    }

    @Override
    public int rateStuHomework(int sh_id, int grade) {
        StudentHomework stuHW;
        if((stuHW = studentHomeworkDao.findStudentHomeworkById(sh_id)) == null){
            return -1;
        }
        stuHW.setGrade(grade);
        studentHomeworkDao.saveOrUpdate(stuHW);
        return 0;
    }
}
