package com.seproj.cloudhomework.controller;

import com.seproj.cloudhomework.service.MailService;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import java.io.IOException;

@Controller
public class CommonController {
    @Autowired
    private MailService mailService;

    @CrossOrigin
    @GetMapping(value = "test")
    @ResponseBody
    public void test() throws TemplateException, IOException, MessagingException {
        String test3 = "马报过";
        String test4 = "861909776@qq.com";
        String courseName = "去死去死啊";
        mailService.sendHomeworkInformMail(test3, courseName, test4);
    }
}
