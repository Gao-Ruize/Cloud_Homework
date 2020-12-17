package com.seproj.cloudhomework.controller;

import com.seproj.cloudhomework.entity.Course;
import com.seproj.cloudhomework.entity.Homework;
import com.seproj.cloudhomework.service.StudentService;
import com.seproj.cloudhomework.utils.Course.CourseDetail;
import com.seproj.cloudhomework.utils.Homework.HandInHomework;
import com.seproj.cloudhomework.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class StudentController {
    @Autowired
    private StudentService studentservice;

    @CrossOrigin
    @GetMapping(value = "api/student/getCoursesbysid/{user_id}")
    @ResponseBody
    public List<Course> getCoursesById(@PathVariable int user_id){
         System.out.println("user id is: "+user_id);
        return studentservice.getCoursesBySid(user_id);
    }

    @CrossOrigin
    @GetMapping(value = "api/student/getCourseDetail/{cid}")
    @ResponseBody
    public CourseDetail getCourseDetail(@PathVariable int cid){
        return studentservice.getCourseDetail(cid);
    }

    @CrossOrigin
    @GetMapping(value = "api/student/getHomeworks/{sid}/{cid}/{type}")
    @ResponseBody
    public List<Homework> getHomeworks(@PathVariable int sid, @PathVariable int cid, @PathVariable int type){
        return studentservice.getHomeworks(sid, cid, type);
    }

    @CrossOrigin
    @GetMapping(value = "api/student/getHomeworkDetail/{hid}")
    @ResponseBody
    public Homework getHomeworkDetail(@PathVariable int hid){
        return studentservice.getHomeworkDetail(hid);
    }

    @CrossOrigin
    @PostMapping(value = "api/student/handInHomework")
    @ResponseBody
    public Result handInHomework(@RequestBody HandInHomework homework){
        switch(studentservice.handInHomework(homework)){
            case 0: // 正常提交
                return new Result(200);
            case 1: // 超时提交
                return new Result(201);
            case 2: // 覆盖提交
                return new Result(202);
            // 其他错误
            default:
                return new Result(300);
        }
    }

    @CrossOrigin
    @GetMapping(value = "api/student/getGrade/{sid}/{cid}")
    @ResponseBody
    public float getGrade(@PathVariable int sid, @PathVariable int cid){
        return studentservice.getGrade(sid, cid);
    }
}
