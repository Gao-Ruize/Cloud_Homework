package com.seproj.cloudhomework.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Data
@Entity
@Table(name = "homework")
public class Homework {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    String name;
    Date releaseTime;
    Date deadline;
    String content;
    String courseId;

    public Homework(String name, Date releaseTime, Date deadline, String content, String courseId) {
        this.name = name;
        this.releaseTime = releaseTime;
        this.deadline = deadline;
        this.content = content;
        this.courseId = courseId;
    }

    public Homework() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Homework homework = (Homework) o;
        return id == homework.id &&
                Objects.equals(name, homework.name) &&
                Objects.equals(releaseTime, homework.releaseTime) &&
                Objects.equals(deadline, homework.deadline) &&
                Objects.equals(content, homework.content) &&
                Objects.equals(courseId, homework.courseId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, releaseTime, deadline, content, courseId);
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

    public Date getReleaseTime() {
        return releaseTime;
    }

    public void setReleaseTime(Date releaseTime) {
        this.releaseTime = releaseTime;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }
}
