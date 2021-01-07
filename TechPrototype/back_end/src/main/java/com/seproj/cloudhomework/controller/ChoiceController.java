package com.seproj.cloudhomework.controller;

import com.seproj.cloudhomework.entity.Choice;
import com.seproj.cloudhomework.entity.Instruct;
import com.seproj.cloudhomework.entity.Stuchoice;
import com.seproj.cloudhomework.service.AuthorityService;
import com.seproj.cloudhomework.service.ChoiceService;
import com.seproj.cloudhomework.service.InstructService;
import com.seproj.cloudhomework.service.StuchoiceService;
import com.seproj.cloudhomework.utils.Homework.Ans;
import com.seproj.cloudhomework.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class ChoiceController {
    @Autowired
    private ChoiceService choiceService;
    @Autowired
    private InstructService instructService;
    @Autowired
    private AuthorityService authorityService;
    @Autowired
    private StuchoiceService stuchoiceService;

    // 教师布置选择题,逐道布置
    // 在前端检查输入
    @CrossOrigin
    @PostMapping(value = "api/teacher/submitchoice")
    @ResponseBody
    public Result submitChoice(@RequestBody Choice choice) {
        Choice c = choiceService.save(choice);
        int choiceId = c.getId();
        String answer = c.getAnswer();
        // save in stuChoice
        List<Instruct> instructs = instructService.findByCourseId(choice.getCourseid());
        for(Instruct ins: instructs) {
            int stuId = authorityService.changeSidtoId(ins.getStudentId());
            Stuchoice stuchoice = new Stuchoice(stuId, choiceId, answer, null, -1);
            stuchoiceService.save(stuchoice);
        }
        return new Result(200);
    }

    // 学生获取自己某门课程的所有选择题
    @CrossOrigin
    @GetMapping(value = "api/stu/allchoice/{studentid}/{courseid}")
    @ResponseBody
    public List<Stuchoice> allStuChoice(@PathVariable int studentid, @PathVariable int courseid) {
        List<Stuchoice> stuchoices = stuchoiceService.findAllByStudentid(2);
        // 将content与courseId加入stuChoice
        for(Stuchoice iter: stuchoices) {
            int choiceId = iter.getChoiceid();
            Choice choice = choiceService.findDistinctById(choiceId);
            iter.setCourseid(choice.getCourseid());
            iter.setContent(choice.getContent());
        }
        // 筛选出courseId相同的题目
        List<Stuchoice> ret = new ArrayList<>();
        for(Stuchoice iter: stuchoices) {
            int cId = iter.getCourseid();
            if(cId == courseid) {
                ret.add(iter);
            }
        }
        return ret;
    }

    // 学生提交选择题并直接判断并记分，更新stuChoice
    @CrossOrigin
    @PostMapping(value = "api/stu/submitans")
    @ResponseBody
    public Result stuSubmitAns(@RequestBody Ans answer) {
        int choiceid = answer.getChoiceid();
        int studentid = answer.getStudentid();
        String ans = answer.getAns();
        Choice choice = choiceService.findDistinctById(choiceid);
        String formalAns = choice.getAnswer();
        Stuchoice stuchoice = stuchoiceService.findDistinctByStudentidAndChoiceid(studentid, choiceid);
        int grade = 0;
        if(formalAns.equals(ans)) {
            grade = 1;
        }
        stuchoice.setAnswer(ans);
        stuchoice.setGrade(grade);
        stuchoiceService.save(stuchoice);
        if(grade == 1) {
            return new Result(200);
        }
        return new Result(201);
    }
}
