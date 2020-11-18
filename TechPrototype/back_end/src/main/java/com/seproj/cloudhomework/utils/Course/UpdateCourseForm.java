package com.seproj.cloudhomework.utils.Course;

import java.util.Objects;

public class UpdateCourseForm {
    String name;    // 课程名
    String courseId;    // 课程编号
    String courseInfo;  // 课程简介
    String teacherId;   // 教师工号

    public UpdateCourseForm(String name, String courseId, String courseInfo, String teacherId) {
        this.name = name;
        this.courseId = courseId;
        this.courseInfo = courseInfo;
        this.teacherId = teacherId;
    }

    public UpdateCourseForm() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UpdateCourseForm that = (UpdateCourseForm) o;
        return Objects.equals(name, that.name) &&
                Objects.equals(courseId, that.courseId) &&
                Objects.equals(courseInfo, that.courseInfo) &&
                Objects.equals(teacherId, that.teacherId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, courseId, courseInfo, teacherId);
    }

    @Override
    public String toString() {
        return "UpdateCourseForm{" +
                "name='" + name + '\'' +
                ", courseId='" + courseId + '\'' +
                ", courseInfo='" + courseInfo + '\'' +
                ", teacherId='" + teacherId + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseInfo() {
        return courseInfo;
    }

    public void setCourseInfo(String courseInfo) {
        this.courseInfo = courseInfo;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }
}
