package com.seproj.cloudhomework.utils.Homework;

import java.util.Objects;

public class RateStuHomework {
    int id;
    int grade;

    public RateStuHomework() {
    }

    public RateStuHomework(int id, int grade) {
        this.id = id;
        this.grade = grade;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RateStuHomework that = (RateStuHomework) o;
        return id == that.id &&
                grade == that.grade;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, grade);
    }

    @Override
    public String toString() {
        return "RateStuHomework{" +
                "id=" + id +
                ", grade=" + grade +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }
}
