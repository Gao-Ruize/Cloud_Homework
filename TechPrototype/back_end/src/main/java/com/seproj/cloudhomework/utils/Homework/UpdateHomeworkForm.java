package com.seproj.cloudhomework.utils.Homework;

import java.util.Date;
import java.util.Objects;

public class UpdateHomeworkForm {
    int id;
    String user_id;
    String courseId;
    String name;
    String content;
    Date releasetime;
    Date deadline;

    public UpdateHomeworkForm(int id, String user_id, String courseId, String name, String content, Date releasetime, Date deadline) {
        this.id = id;
        this.user_id = user_id;
        this.courseId = courseId;
        this.name = name;
        this.content = content;
        this.releasetime = releasetime;
        this.deadline = deadline;
    }

    public UpdateHomeworkForm() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UpdateHomeworkForm that = (UpdateHomeworkForm) o;
        return id == that.id &&
                Objects.equals(user_id, that.user_id) &&
                Objects.equals(courseId, that.courseId) &&
                Objects.equals(name, that.name) &&
                Objects.equals(content, that.content) &&
                Objects.equals(releasetime, that.releasetime) &&
                Objects.equals(deadline, that.deadline);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user_id, courseId, name, content, releasetime, deadline);
    }

    @Override
    public String toString() {
        return "UpdateCourseForm{" +
                "id=" + id +
                ", user_id='" + user_id + '\'' +
                ", courseId='" + courseId + '\'' +
                ", name='" + name + '\'' +
                ", content='" + content + '\'' +
                ", releasetime=" + releasetime +
                ", deadline=" + deadline +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
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
