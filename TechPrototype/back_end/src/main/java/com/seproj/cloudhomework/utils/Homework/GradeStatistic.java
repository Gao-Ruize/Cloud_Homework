package com.seproj.cloudhomework.utils.Homework;

import java.util.Objects;

public class GradeStatistic {
    // TODO: avg_grade应该是float？
    int avg_grade;  // 平均成绩
    int num_stu;    // 提交数量
    int num_allstu; // 学生总人数
    int max_grade;  // 最高分
    int min_grade;  // 最低分

    public GradeStatistic(int avg_grade, int num_stu, int num_allstu, int max_grade, int min_grade) {
        this.avg_grade = avg_grade;
        this.num_stu = num_stu;
        this.num_allstu = num_allstu;
        this.max_grade = max_grade;
        this.min_grade = min_grade;
    }

    public GradeStatistic() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GradeStatistic that = (GradeStatistic) o;
        return avg_grade == that.avg_grade &&
                num_stu == that.num_stu &&
                num_allstu == that.num_allstu &&
                max_grade == that.max_grade &&
                min_grade == that.min_grade;
    }

    @Override
    public int hashCode() {
        return Objects.hash(avg_grade, num_stu, num_allstu, max_grade, min_grade);
    }

    @Override
    public String toString() {
        return "GradeStatistic{" +
                "avg_grade=" + avg_grade +
                ", num_stu=" + num_stu +
                ", num_allstu=" + num_allstu +
                ", max_grade=" + max_grade +
                ", min_grade=" + min_grade +
                '}';
    }

    public int getAvg_grade() {
        return avg_grade;
    }

    public void setAvg_grade(int avg_grade) {
        this.avg_grade = avg_grade;
    }

    public int getNum_stu() {
        return num_stu;
    }

    public void setNum_stu(int num_stu) {
        this.num_stu = num_stu;
    }

    public int getNum_allstu() {
        return num_allstu;
    }

    public void setNum_allstu(int num_allstu) {
        this.num_allstu = num_allstu;
    }

    public int getMax_grade() {
        return max_grade;
    }

    public void setMax_grade(int max_grade) {
        this.max_grade = max_grade;
    }

    public int getMin_grade() {
        return min_grade;
    }

    public void setMin_grade(int min_grade) {
        this.min_grade = min_grade;
    }
}
