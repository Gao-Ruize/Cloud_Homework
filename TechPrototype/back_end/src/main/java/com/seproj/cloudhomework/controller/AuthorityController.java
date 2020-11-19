package com.seproj.cloudhomework.controller;


import com.seproj.cloudhomework.entity.User;
import com.seproj.cloudhomework.service.AuthorityService;
import com.seproj.cloudhomework.utils.Authority.LoginForm;
import com.seproj.cloudhomework.utils.Authority.LoginResult;
import com.seproj.cloudhomework.utils.Authority.ModifyForm;
import com.seproj.cloudhomework.utils.Authority.RegisterForm;

import com.seproj.cloudhomework.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AuthorityController {
    @Autowired
    private AuthorityService authorityservice;

    @CrossOrigin
    @PostMapping(value = "api/user/register")
    @ResponseBody
    public Result register(@RequestBody RegisterForm registerform){
        String usertype = registerform.getUsertype();

        if(usertype.equals("S")){
            // 注册信息为学生
            if(authorityservice.registerAsStudent(registerform) == 0){
                return new Result(200);
            }
            else{
                return new Result(300);
            }
        }
        if(usertype.equals("T")){
            // 注册信息为教师
            if(authorityservice.registerAsTeacher(registerform) == 0){
                return new Result(200);
            }
            else{
                return new Result(300);
            }
        }

        // 注册失败/信息有误
        return new Result(300);
    }

    @CrossOrigin
    @PostMapping(value = "api/user/login")
    @ResponseBody
    public LoginResult login(@RequestBody LoginForm loginform){
        User user;
        if((user = authorityservice.login(loginform)) == null) {
            return new LoginResult(300, null);
        }
        switch(user.getRole()){
            case 0: // 用户为学生身份
                return new LoginResult(200, user);
            case 1: // 用户为教师身份
                return new LoginResult(201, user);
            case 2: // 用户为管理员身份
                return new LoginResult(300, user);
        }
        return new LoginResult(300, null);
    }

    @CrossOrigin
    @PostMapping(value = "api/user/modify")
    @ResponseBody
    public Result ModifyUserInfo(@RequestBody ModifyForm modifyform){
        if(authorityservice.modify(modifyform) == 0) {  // 修改成功
            return new Result(200);
        }

        return new Result(300);
    }
}
