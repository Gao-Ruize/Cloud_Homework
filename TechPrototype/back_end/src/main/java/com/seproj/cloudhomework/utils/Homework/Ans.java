package com.seproj.cloudhomework.utils.Homework;

public class Ans {
    int studentid;
    int choiceid;
    String ans;
    Ans() {}
    Ans(int studentid, int choiceid, String ans) {
        this.studentid = studentid;
        this.choiceid = choiceid;
        this.ans = ans;
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

    public String getAns() {
        return ans;
    }

    public void setAns(String ans) {
        this.ans = ans;
    }
}
