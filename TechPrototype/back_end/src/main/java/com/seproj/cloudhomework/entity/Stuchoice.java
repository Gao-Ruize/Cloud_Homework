package com.seproj.cloudhomework.entity;


import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "stuchoice")
public class Stuchoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    int studentid;
    int choiceid;
    String answer;
    Date committime;
    int grade;

    public Stuchoice(int studentid, int choiceid, String answer, Date committime, int grade) {
        this.studentid = studentid;
        this.choiceid = choiceid;
        this.answer = answer;
        this.committime = committime;
        this.grade = grade;
    }

    public Stuchoice() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStudentid() {
        return studentid;
    }

    public void setStudentid(int studentid) {
        this.studentid = studentid;
    }

    public int getChoiceid() {
        return choiceid;
    }

    public void setChoiceid(int choiceid) {
        this.choiceid = choiceid;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Date getCommittime() {
        return committime;
    }

    public void setCommittime(Date committime) {
        this.committime = committime;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    @Transient
    String content;

    public String getContent() {return content;}

    public void setContent(String content) {this.content = content;}

    @Transient
    int courseid;
    public int getCourseid() {return courseid;}
    public void setCourseid(int courseid) {this.courseid = courseid;}
}
