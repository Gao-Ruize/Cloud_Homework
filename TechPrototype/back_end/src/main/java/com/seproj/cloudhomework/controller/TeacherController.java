package com.seproj.cloudhomework.controller;

import com.seproj.cloudhomework.entity.Course;
import com.seproj.cloudhomework.entity.Homework;
import com.seproj.cloudhomework.entity.StudentHomework;
import com.seproj.cloudhomework.entity.User;
import com.seproj.cloudhomework.service.TeacherService;
import com.seproj.cloudhomework.utils.Course.AddStuToCourseForm;
import com.seproj.cloudhomework.utils.Course.CourseDetail;
import com.seproj.cloudhomework.utils.Course.UpdateCourseForm;
import com.seproj.cloudhomework.utils.Homework.*;
import com.seproj.cloudhomework.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @CrossOrigin
    @PostMapping(value = "api/teacher/createcourse")
    @ResponseBody
    public Result createCourse(@RequestBody UpdateCourseForm updateCourseForm){
        if(teacherService.createCourse(updateCourseForm) == 0){
            return new Result(200);
        }
        return new Result(400);
    }

    @CrossOrigin
    @PostMapping(value = "api/teacher/updatecourse")
    @ResponseBody
    public Result updateCourse(@RequestBody UpdateCourseForm updateCourseForm){
        if(teacherService.updateCourse(updateCourseForm) == 0){
            return new Result(200);
        }
        return new Result(400);
    }

    @CrossOrigin
    @GetMapping(value = "api/teacher/getallcoursebytid/{tid}")
    @ResponseBody
    public List<Course> getAllCourseByTid(@PathVariable String tid){
        return teacherService.getAllCourseByTid(tid);
    }

    @CrossOrigin
    @GetMapping(value = "api/teacher/getCourseDetail/{cid}")
    @ResponseBody
    public CourseDetail getCourseDetail(@PathVariable int cid){
        return teacherService.getCourseDetail(cid);
    }

    @CrossOrigin
    @GetMapping(value = "api/teacher/getallstudents")
    @ResponseBody
    public List<User> getAllStudents(){
        return teacherService.getAllStudents();
    }

    @CrossOrigin
    @PostMapping(value = "api/teacher/addstudents")
    @ResponseBody
    public Result addStudentsToCourse(@RequestBody AddStuToCourseForm form){
        if(teacherService.addStudents(form.getId(), form.getStu_list()) == 0){
            return new Result(200);
        }
        return new Result(400);
    }

//    @CrossOrigin
//    @PostMapping(value = "api/teacher/getstudentsincourse/{cid}")
//    @ResponseBody
//    public List<User> getStudentsInCourse(@PathVariable int cid){
//        return teacherService.getStudentsInCourse(cid);
//    }

    @CrossOrigin
    @PostMapping(value = "api/teacher/createhomework")
    @ResponseBody
    public Result createHomework(@RequestBody CreateHomeworkForm newHomework){
        if(teacherService.createHomework(newHomework) == 0){
            return new Result(200);
        }
        return new Result(400);
    }

    @CrossOrigin
    @PostMapping(value = "api/teacher/updatehomework")
    @ResponseBody
    public Result updateHomework(@RequestBody UpdateHomeworkForm newHomework){
        if(teacherService.updateHomework(newHomework) == 0){
            return new Result(200);
        }
        return new Result(400);
    }

    @CrossOrigin
    @GetMapping(value = "api/teacher/getgrade/{c_id}/{courseId}/{h_id}")
    @ResponseBody
    public GradeStatistic getGrade(@PathVariable int c_id, @PathVariable String courseId, @PathVariable int h_id){
        return teacherService.getGrade(c_id, courseId, h_id);
    }

    @CrossOrigin
    @GetMapping(value = "api/teacher/getallhomework/{cid}")
    @ResponseBody
    public List<Homework> getAllHomework(@PathVariable int cid){
        return teacherService.getAllHomework(cid);
    }

    @CrossOrigin
    @GetMapping(value = "api/teacher/getstuhomeworklist/{c_id}/{courseId}/{h_id}")
    @ResponseBody
    public List<StuHomeworkBrief> getStuHomeworkList(@PathVariable int c_id, @PathVariable String courseId, @PathVariable int h_id){
        return teacherService.getStuHomeworkList(c_id, courseId, h_id);
    }

    @CrossOrigin
    @GetMapping(value = "api/teacher/getstuhomework/{sh_id}")
    @ResponseBody
    public StudentHomework getStuHomework(@PathVariable int sh_id){
        return teacherService.getStuHomework(sh_id);
    }

    @CrossOrigin
    @PostMapping(value = "api/teacher/ratestuhomework")
    @ResponseBody
    public Result rateStuHomework(@RequestBody RateStuHomework rateData) {
        if(teacherService.rateStuHomework(rateData.getId(), rateData.getGrade()) == 0){
            return new Result(200);
        }
        return new Result(400);
    }
}
