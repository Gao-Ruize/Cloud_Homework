package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.UserDao;
import com.seproj.cloudhomework.entity.User;
import com.seproj.cloudhomework.service.AuthorityService;
import com.seproj.cloudhomework.utils.Authority.LoginForm;
import com.seproj.cloudhomework.utils.Authority.ModifyForm;
import com.seproj.cloudhomework.utils.Authority.RegisterForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//@Service
public class AuthorityServiceImpl implements AuthorityService {
    @Autowired
    private UserDao userdao;

    @Override
    public int registerAsStudent(RegisterForm registerform) {
        // 返回0为注册成功，返回1为同userid或username的用户已经存在，返回2为其他错误
        if(userdao.findUserByUserId(registerform.getUserid()) != null
            || userdao.findUserByUsername(registerform.getUsername()) != null){
            // 同名或同id用户已存在
            return 1;
        }
        User newUser = new User(registerform.getUsername(),
                registerform.getPassword(),
                registerform.getName(),
                registerform.getUserid(),
                registerform.getEmail(),
                registerform.getPhone(),
                0);
        userdao.saveOrUpdate(newUser);
        return 0;
    }

    @Override
    public int registerAsTeacher(RegisterForm registerform) {
        // 返回0为注册成功，返回1为同userid或username的用户已经存在，返回2为其他错误
        if(userdao.findUserByUserId(registerform.getUserid()) != null
                || userdao.findUserByUsername(registerform.getUsername()) != null){
            // 同名或同id用户已存在
            return 1;
        }
        User newUser = new User(registerform.getUsername(),
                registerform.getPassword(),
                registerform.getName(),
                registerform.getUserid(),
                registerform.getEmail(),
                registerform.getPhone(),
                1);
        userdao.saveOrUpdate(newUser);
        return 0;
    }

    @Override
    public User login(LoginForm loginform) {
        User checkUser = userdao.findUserByUsername(loginform.getUsername());
        if(checkUser == null){
            return null;
        }
        if(checkUser.getPassword().equals(loginform.getPassword())){
            return checkUser;
        }
        return null;
    }

    @Override
    public int modify(ModifyForm modifyform) {
        User getUser;
        if((getUser = userdao.findUserById(modifyform.getId())) == null){
            return 1;
        }
        getUser.setPhone(modifyform.getPhone());
        getUser.setEmail(modifyform.getEmail());
        userdao.saveOrUpdate(getUser);
        return 0;
    }
}
