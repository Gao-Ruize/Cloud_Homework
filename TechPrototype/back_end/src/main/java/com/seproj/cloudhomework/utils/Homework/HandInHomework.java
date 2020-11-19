package com.seproj.cloudhomework.utils.Homework;

import java.util.Objects;

public class HandInHomework {
    private int sid;    // 学生id
    private int hid;    // 作业id
    private String content;
    private String picture;

    public HandInHomework(int sid, int hid, String content, String picture) {
        this.sid = sid;
        this.hid = hid;
        this.content = content;
        this.picture = picture;
    }

    public HandInHomework() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HandInHomework that = (HandInHomework) o;
        return sid == that.sid &&
                hid == that.hid &&
                Objects.equals(content, that.content) &&
                Objects.equals(picture, that.picture);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sid, hid, content, picture);
    }

    @Override
    public String toString() {
        return "HandInHomework{" +
                "sid=" + sid +
                ", hid=" + hid +
                ", content='" + content + '\'' +
                ", picture='" + picture + '\'' +
                '}';
    }

    public int getSid() {
        return sid;
    }

    public void setSid(int sid) {
        this.sid = sid;
    }

    public int getHid() {
        return hid;
    }

    public void setHid(int hid) {
        this.hid = hid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
