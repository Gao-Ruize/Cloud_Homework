package com.seproj.cloudhomework.service;

import com.seproj.cloudhomework.entity.User;
import com.seproj.cloudhomework.utils.Authority.LoginForm;
import com.seproj.cloudhomework.utils.Authority.ModifyForm;
import com.seproj.cloudhomework.utils.Authority.RegisterForm;
import org.springframework.stereotype.Service;

/**
 * 类 {@code AuthorityService} 负责用户权限管理相关业务.
 *
 * 包括用户注册、登录、修改个人信息功能.
 *
 * @author Gao-Ruize
 * @since 2020/11/18 version1.0
 * @version 1.0
 */
@Service
public interface AuthorityService {
   /**
    * <p>以学生身份进行注册.</p>
    *
    * <p>将学生和教师分开注册是为了方便以后进行功能扩展.</p>
    *
    * @param registerform 用户注册信息
    * @return 0为成功；1为用户ID/name已存在，2为其他原因导致失败
    */
   int registerAsStudent(RegisterForm registerform);

   /**
    * <p>以教师身份进行注册.</p>
    *
    * @param registerform 用户注册信息
    * @return 0为成功；1为用户ID/name已存在，2为其他原因导致失败
    */
   int registerAsTeacher(RegisterForm registerform);

   /**
    * <p>用户登录.</p>
    *
    * @param loginform 用户登录信息
    * @return 用户基本信息，登录失败返回null
    */
   User login(LoginForm loginform);

   /**
    * <p>修改用户基本信息.</p>
    *
    * <p>version 1.0中只提供修改手机号和邮箱</p>
    *
    * @param modifyform 用户修改后的个人信息
    * @return 0为成功，1为失败
    */
   int modify(ModifyForm modifyform);
}
