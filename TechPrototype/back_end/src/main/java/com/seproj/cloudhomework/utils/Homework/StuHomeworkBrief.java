package com.seproj.cloudhomework.utils.Homework;

import java.util.Objects;

public class StuHomeworkBrief {
    int id; // stuhomework的自增id
    String user_id; // 学生学号
    String stu_name;    // 学生姓名
    int grade;  // 成绩

    public StuHomeworkBrief(int id, String user_id, String stu_name, int grade) {
        this.id = id;
        this.user_id = user_id;
        this.stu_name = stu_name;
        this.grade = grade;
    }

    public StuHomeworkBrief() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StuHomeworkBrief that = (StuHomeworkBrief) o;
        return id == that.id &&
                grade == that.grade &&
                Objects.equals(user_id, that.user_id) &&
                Objects.equals(stu_name, that.stu_name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user_id, stu_name, grade);
    }

    @Override
    public String toString() {
        return "StuHomeworkBrief{" +
                "id=" + id +
                ", user_id='" + user_id + '\'' +
                ", stu_name='" + stu_name + '\'' +
                ", grade=" + grade +
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

    public String getStu_name() {
        return stu_name;
    }

    public void setStu_name(String stu_name) {
        this.stu_name = stu_name;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }
}
