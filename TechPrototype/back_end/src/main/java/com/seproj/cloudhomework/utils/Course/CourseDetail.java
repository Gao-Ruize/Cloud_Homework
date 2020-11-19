package com.seproj.cloudhomework.utils.Course;

import java.util.Objects;

public class CourseDetail {
    private int id; // 课程id（数据库中存储）
    private String name;
    private String courseId;    // 课程编号
    private int teacherId;
    private int status;
    private String teacherName;

    public CourseDetail(int id, String name, String courseId, int teacherId, int status, String teacherName) {
        this.id = id;
        this.name = name;
        this.courseId = courseId;
        this.teacherId = teacherId;
        this.status = status;
        this.teacherName = teacherName;
    }

    public CourseDetail() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CourseDetail that = (CourseDetail) o;
        return id == that.id &&
                teacherId == that.teacherId &&
                status == that.status &&
                Objects.equals(name, that.name) &&
                Objects.equals(courseId, that.courseId) &&
                Objects.equals(teacherName, that.teacherName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, courseId, teacherId, status, teacherName);
    }

    @Override
    public String toString() {
        return "CourseDetail{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", courseId='" + courseId + '\'' +
                ", teacherId=" + teacherId +
                ", status=" + status +
                ", teacherName='" + teacherName + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(int teacherId) {
        this.teacherId = teacherId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }
}
