package com.seproj.cloudhomework.controller;

import com.seproj.cloudhomework.service.CourseService;
import com.seproj.cloudhomework.service.HomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class TeacherController {
    @Autowired
    private HomeworkService homeworkservice;
    @Autowired
    private CourseService courseservice;
}
