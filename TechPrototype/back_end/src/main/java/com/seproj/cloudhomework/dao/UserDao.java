package com.seproj.cloudhomework.dao;

import com.seproj.cloudhomework.entity.User;

import java.util.List;

public interface UserDao {
    User findUserById(int id);
    User findUserByUsername(String username);
    User findUserByUserId(String userId);
    List<User> findUserByRole(int role);
    void saveOrUpdate(User user);
}
