package com.seproj.cloudhomework.utils.Course;

import java.util.List;
import java.util.Objects;

public class AddStuToCourseForm {
    int id; // 课程的id
    List<String> stu_list;

    public AddStuToCourseForm(int id, List<String> stu_list) {
        this.id = id;
        this.stu_list = stu_list;
    }

    public AddStuToCourseForm() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddStuToCourseForm that = (AddStuToCourseForm) o;
        return id == that.id &&
                Objects.equals(stu_list, that.stu_list);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, stu_list);
    }

    @Override
    public String toString() {
        return "AddStuToCourseForm{" +
                "id=" + id +
                ", stu_list=" + stu_list +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<String> getStu_list() {
        return stu_list;
    }

    public void setStu_list(List<String> stu_list) {
        this.stu_list = stu_list;
    }
}
