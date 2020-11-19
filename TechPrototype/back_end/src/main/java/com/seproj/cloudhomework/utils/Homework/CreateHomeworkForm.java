package com.seproj.cloudhomework.utils.Homework;

import java.util.Date;
import java.util.Objects;

public class CreateHomeworkForm {
    String courseId;    // 作业所属课程编号
    String name;    // 作业名
    String content; // 作业内容
    Date releasetime;   // 发布时间
    Date deadline;      // 截止时间

    public CreateHomeworkForm(String courseId, String name, String content, Date releasetime, Date deadline) {
        this.courseId = courseId;
        this.name = name;
        this.content = content;
        this.releasetime = releasetime;
        this.deadline = deadline;
    }

    public CreateHomeworkForm() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CreateHomeworkForm that = (CreateHomeworkForm) o;
        return Objects.equals(courseId, that.courseId) &&
                Objects.equals(name, that.name) &&
                Objects.equals(content, that.content) &&
                Objects.equals(releasetime, that.releasetime) &&
                Objects.equals(deadline, that.deadline);
    }

    @Override
    public int hashCode() {
        return Objects.hash(courseId, name, content, releasetime, deadline);
    }

    @Override
    public String toString() {
        return "CreateHomeworkForm{" +
                "courseId='" + courseId + '\'' +
                ", name='" + name + '\'' +
                ", content='" + content + '\'' +
                ", releasetime=" + releasetime +
                ", deadline=" + deadline +
                '}';
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getReleasetime() {
        return releasetime;
    }

    public void setReleasetime(Date releasetime) {
        this.releasetime = releasetime;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }
}
