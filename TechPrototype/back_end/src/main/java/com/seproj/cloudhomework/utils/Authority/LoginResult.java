package com.seproj.cloudhomework.utils.Authority;

import com.seproj.cloudhomework.entity.User;

import java.util.Objects;

public class LoginResult {
    private int code;
    private User user;
    // private String token;

    public LoginResult(int code, User user) {
        this.code = code;
        this.user = user;
    }

    public LoginResult() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoginResult that = (LoginResult) o;
        return code == that.code &&
                Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code, user);
    }

    @Override
    public String toString() {
        return "LoginResult{" +
                "code=" + code +
                ", user=" + user +
                '}';
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
