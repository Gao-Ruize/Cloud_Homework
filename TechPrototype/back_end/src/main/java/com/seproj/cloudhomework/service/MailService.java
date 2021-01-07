package com.seproj.cloudhomework.service;

import freemarker.template.TemplateException;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;

@Service
public interface MailService {
    void sendGradeInformMail(String name, String receiver) throws IOException, TemplateException, MessagingException;
    void sendHomeworkInformMail(String name, String courseName, String receiver) throws IOException, TemplateException, MessagingException;
    void sendCourseInformMail(String name, String courseName, String receiver) throws IOException, TemplateException, MessagingException;

}
