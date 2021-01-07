package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.service.MailService;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class MailServiceImpl implements MailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    Configuration configuration;

    private final String sender = "18175156029@163.com";

    @Override
    public void sendGradeInformMail(String name, String receiver) throws IOException, TemplateException, MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom(sender);
        helper.setTo(receiver);
        helper.setSubject("成绩更新通知");

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("toUserName", name);

        Template t = configuration.getTemplate("updateGrade.ftl");
        String content = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
        helper.setText(content, true);
        javaMailSender.send(mimeMessage);
    }

    @Override
    public void sendHomeworkInformMail(String name, String courseName, String receiver) throws IOException, TemplateException, MessagingException{
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom(sender);
        helper.setTo(receiver);
        helper.setSubject("作业布置通知");

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("toUserName", name);
        model.put("courseName", courseName);

        Template t = configuration.getTemplate("newHomework.ftl");
        String content = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
        helper.setText(content, true);
        javaMailSender.send(mimeMessage);

    }

    @Override
    public void sendCourseInformMail(String name, String courseName, String receiver) throws IOException, TemplateException, MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom(sender);
        helper.setTo(receiver);
        helper.setSubject("课程信息通知");

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("toUserName", name);
        model.put("courseName", courseName);

        Template t = configuration.getTemplate("addCourse.ftl");
        String content = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
        helper.setText(content, true);
        javaMailSender.send(mimeMessage);
    }
}
