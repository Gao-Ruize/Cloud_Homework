package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.UserDao;
import com.seproj.cloudhomework.entity.User;
import com.seproj.cloudhomework.utils.Authority.LoginForm;
import com.seproj.cloudhomework.utils.Authority.ModifyForm;
import com.seproj.cloudhomework.utils.Authority.RegisterForm;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.internal.matchers.Null;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(SpringExtension.class)
@SpringBootTest
//@Transactional
class AuthorityServiceImplTest {
    @Autowired
    private AuthorityServiceImpl authorityServiceImpl;

    @MockBean
    private UserDao userdao;

    @BeforeEach
    void setUp() throws Exception{
        Mockito.when(userdao.findUserByUsername(Mockito.anyString())).thenAnswer(
                new Answer<User>(){
                    @Override
                    public User answer(InvocationOnMock invocation) throws Throwable {
                        if(invocation.getArgument(0).equals("XiaoMing")){
                            return new User("XiaoMing",
                                    "XMsPassword",
                                    "XiaoMing",
                                    "518123456789",
                                    "XiaoMing@sjtu.edu.cn",
                                    "123456789",
                                    0);
                        }else if(invocation.getArgument(0).equals("XiaoZhang")){
                            return new User("XiaoZhang",
                            "XZsPassword",
                            "XiaoZhang",
                            "518987654321",
                            "XiaoZhang@sjtu.edu.cn",
                            "987654321",
                            0);
                        }else if(invocation.getArgument(0).equals("MrWang")){
                            return new User("MrWang",
                                    "WangPassword",
                                    "MrWang",
                                    "11111111",
                                    "MrWang@sjtu.edu.cn",
                                    "22222222",
                                    1);
                        }
                        else{
                            return null;
                        }
                    }
                }
        );
        Mockito.when(userdao.findUserByUserId(Mockito.anyString())).thenAnswer(
                new Answer<User>(){
                    @Override
                    public User answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals("518123456789")){
                            return new User("XiaoMing",
                                    "XMsPassword",
                                    "XiaoMing",
                                    "518123456789",
                                    "XiaoMing@sjtu.edu.cn",
                                    "123456789",
                                    0);
                        }else if(invocationOnMock.getArgument(0).equals("518987654321")){
                            return new User("XiaoZhang",
                                    "XZsPassword",
                                    "XiaoZhang",
                                    "518987654321",
                                    "XiaoZhang@sjtu.edu.cn",
                                    "987654321",
                                    0);
                        }else if(invocationOnMock.getArgument(0).equals("11111111")){
                            return new User("MrWang",
                                    "WangPassword",
                                    "MrWang",
                                    "11111111",
                                    "MrWang@sjtu.edu.cn",
                                    "22222222",
                                    1);
                        }
                        else{
                            return null;
                        }
                    }
                }
        );
        Mockito.when(userdao.findUserById(Mockito.anyInt())).thenAnswer(
                new Answer<User>(){
                    @Override
                    public User answer(InvocationOnMock invocationOnMock) throws Throwable {
                        if(invocationOnMock.getArgument(0).equals(64)){
                            return new User("XiaoMing",
                                    "XMsPassword",
                                    "XiaoMing",
                                    "518123456789",
                                    "XiaoMing@sjtu.edu.cn",
                                    "123456789",
                                    0);
                        }else if(invocationOnMock.getArgument(0).equals(128)){
                            return new User("XiaoZhang",
                                    "XZsPassword",
                                    "XiaoZhang",
                                    "518987654321",
                                    "XiaoZhang@sjtu.edu.cn",
                                    "987654321",
                                    0);
                        }else if(invocationOnMock.getArgument(0).equals(256)){
                            return new User("MrWang",
                                    "WangPassword",
                                    "MrWang",
                                    "11111111",
                                    "MrWang@sjtu.edu.cn",
                                    "22222222",
                                    1);
                        }
                        else{
                            return null;
                        }
                    }
                }
        );
//        Mockito.when(userdao.saveOrUpdate(any(User.class))).thenAnswer(
//
//        );
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void registerAsStudent() {
        RegisterForm rf;
        int exp;
        // 正常注册
        rf = new RegisterForm("518999999999",
                "NewUserName",
                "NewName",
                "NewName@sjtu.edu.cn",
                "99999999",
                "NewPassword",
                "0");
        exp = 0;
        assertEquals(exp, authorityServiceImpl.registerAsStudent(rf));
        // 重复注册
        rf = new RegisterForm("518987654321",
                "XiaoZhang",
                "XiaoZhang",
                "XiaoZhang@sjtu.edu.cn",
                "987654321",
                "XZsPassword",
                "0");
        exp = 1;
        assertEquals(exp, authorityServiceImpl.registerAsStudent(rf));
        // 重复学号
        rf = new RegisterForm("518987654321",
                "NewUserName",
                "NewName",
                "NewName@sjtu.edu.cn",
                "99999999",
                "NewPassword",
                "0");
        exp = 1;
        assertEquals(exp, authorityServiceImpl.registerAsStudent(rf));
        // 重复姓名
        rf = new RegisterForm("518999999999",
                "XiaoZhang",
                "NewName",
                "NewName@sjtu.edu.cn",
                "99999999",
                "NewPassword",
                "0");
        exp = 1;
        assertEquals(exp, authorityServiceImpl.registerAsStudent(rf));
        // 错误邮箱格式&未重复注册学号和姓名
        rf = new RegisterForm("518999999999",
                "NewUserName",
                "NewName",
                "WrongForm.sjtu.edu.cn",
                "99999999",
                "NewPassword",
                "0");
        exp = 101;
        assertEquals(exp, authorityServiceImpl.registerAsStudent(rf));
    }

    @Test
    void registerAsTeacher() {
        RegisterForm rf;
        int exp;
        // 正常注册
        rf = new RegisterForm("222222222",
                "NewUserName",
                "NewName",
                "NewName@sjtu.edu.cn",
                "99999999",
                "NewPassword",
                "1");
        exp = 0;
        assertEquals(exp, authorityServiceImpl.registerAsStudent(rf));
        // 重复工号
        rf = new RegisterForm("11111111",
                "NewUserName",
                "NewName",
                "NewName@sjtu.edu.cn",
                "99999999",
                "NewPassword",
                "1");
        exp = 1;
        assertEquals(exp, authorityServiceImpl.registerAsStudent(rf));
        // 重复用户名
        rf = new RegisterForm("22222222",
                "MrWang",
                "NewName",
                "NewName@sjtu.edu.cn",
                "99999999",
                "NewPassword",
                "1");
        exp = 1;
        assertEquals(exp, authorityServiceImpl.registerAsStudent(rf));
        // 错误邮箱格式
        rf = new RegisterForm("22222222",
                "NewUserName",
                "NewName",
                "Wrongful.email",
                "99999999",
                "NewPassword",
                "1");
        exp = 101;
        assertEquals(exp, authorityServiceImpl.registerAsStudent(rf));
    }

    @Test
    void login() {
        LoginForm lf;
        User exp;
        // 正常登录
        lf = new LoginForm("XiaoMing", "XMsPassword");
        exp = new User("XiaoMing",
                "XMsPassword",
                "XiaoMing",
                "518123456789",
                "XiaoMing@sjtu.edu.cn",
                "123456789",
                0);
        assertEquals(exp, authorityServiceImpl.login(lf));
        // 错误密码
        lf = new LoginForm("XiaoMing", "XZsPassword");
        exp = null;
        assertEquals(exp, authorityServiceImpl.login(lf));
        // 错误用户名（未存在用户）
        lf = new LoginForm("NoneExistUser", "XMsPassword");
        exp = null;
        assertEquals(exp, authorityServiceImpl.login(lf));
    }

    @Test
    void modify() {
        ModifyForm mf;
        int exp;
        // 正常修改
        mf = new ModifyForm(64, "XMsNewEmail@qq.com", "1234567890");
        exp = 0;
        assertEquals(exp, authorityServiceImpl.modify(mf));
        // 错误邮箱格式
        mf = new ModifyForm(128, "XZsNewEmail.qq.163.com", "1234567890");
        exp = 101;
        assertEquals(exp, authorityServiceImpl.modify(mf));
        // 未存在用户
        mf = new ModifyForm(255, "MrWangsNewEmail@163.com", "1234567890");
        exp = 1;
        assertEquals(exp, authorityServiceImpl.modify(mf));
    }

    @Test
    void getUserInfo() {
        String userid;
        User exp;

        userid = "518123456789";
        exp = new User("XiaoMing",
                "XMsPassword",
                "XiaoMing",
                "518123456789",
                "XiaoMing@sjtu.edu.cn",
                "123456789",
                0);
        assertEquals(exp, authorityServiceImpl.getUserInfo(userid));
    }
}