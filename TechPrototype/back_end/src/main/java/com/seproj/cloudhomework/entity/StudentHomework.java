package com.seproj.cloudhomework.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Data
@Entity
@Table(name = "studenthomework")
public class StudentHomework {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    Date commitedTime;
    int homeworkId;
    int grade;  // TODO:暂定-1表示未批改
    String content;
    String picture;
    String studentId;

    public StudentHomework(Date commitedTime, int homeworkId, int grade, String content, String picture, String studentId) {
        this.commitedTime = commitedTime;
        this.homeworkId = homeworkId;
        this.grade = grade;
        this.content = content;
        this.picture = picture;
        this.studentId = studentId;
    }

    public StudentHomework() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StudentHomework that = (StudentHomework) o;
        return id == that.id &&
                homeworkId == that.homeworkId &&
                grade == that.grade &&
                Objects.equals(commitedTime, that.commitedTime) &&
                Objects.equals(content, that.content) &&
                Objects.equals(studentId, that.studentId) &&
                Objects.equals(picture, that.picture);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, commitedTime, homeworkId, grade, content, studentId, picture);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getCommitedTime() {
        return commitedTime;
    }

    public void setCommitedTime(Date commitedTime) {
        this.commitedTime = commitedTime;
    }

    public int getHomeworkId() {
        return homeworkId;
    }

    public void setHomeworkId(int homeworkId) {
        this.homeworkId = homeworkId;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
