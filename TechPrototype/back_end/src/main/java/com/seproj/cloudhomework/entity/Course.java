package com.seproj.cloudhomework.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    String name;
    String courseId;
    String courseInfo;
    int teacherId;
    int status; // TODO:暂定 0：尚未开课，1：正在进行中，2：已结课

    public Course(String name, String courseId, String courseInfo, int teacherId, int status) {
        this.name = name;
        this.courseId = courseId;
        this.courseInfo = courseInfo;
        this.teacherId = teacherId;
        this.status = status;
    }

    public Course() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Course course = (Course) o;
        return id == course.id &&
                teacherId == course.teacherId &&
                status == course.status &&
                Objects.equals(name, course.name) &&
                Objects.equals(courseId, course.courseId) &&
                Objects.equals(courseInfo, course.courseInfo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, courseId, courseInfo, teacherId, status);
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", courseId='" + courseId + '\'' +
                ", courseInfo='" + courseInfo + '\'' +
                ", teacherId=" + teacherId +
                ", status=" + status +
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

    public String getCourseInfo() {
        return courseInfo;
    }

    public void setCourseInfo(String courseInfo) {
        this.courseInfo = courseInfo;
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

    @Transient
    String teacherName;

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }
}
