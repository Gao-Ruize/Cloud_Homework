package com.seproj.cloudhomework.utils.Authority;

import java.util.Objects;

public class ModifyForm {
    private int id; // 用户uid
    private String email;   // 用户邮箱
    private String phone;   // 用户手机号码

    public ModifyForm(int id, String email, String phone) {
        this.id = id;
        this.email = email;
        this.phone = phone;
    }

    public ModifyForm() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ModifyForm that = (ModifyForm) o;
        return id == that.id &&
                Objects.equals(email, that.email) &&
                Objects.equals(phone, that.phone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, phone);
    }

    @Override
    public String toString() {
        return "ModifyForm{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
