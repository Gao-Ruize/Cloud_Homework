package com.seproj.cloudhomework.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "instruct")
public class Instruct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    int courseId;
    String studentId;

    public Instruct(int courseId, String studentId) {
        this.courseId = courseId;
        this.studentId = studentId;
    }

    public Instruct() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Instruct instruct = (Instruct) o;
        return id == instruct.id &&
                courseId == instruct.courseId &&
                Objects.equals(studentId, instruct.studentId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, courseId, studentId);
    }

    @Override
    public String toString() {
        return "Instruct{" +
                "id=" + id +
                ", courseId=" + courseId +
                ", studentId='" + studentId + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
}
