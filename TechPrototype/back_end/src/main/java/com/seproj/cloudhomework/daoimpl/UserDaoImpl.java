package com.seproj.cloudhomework.daoimpl;

import com.seproj.cloudhomework.dao.UserDao;
import com.seproj.cloudhomework.entity.User;
import com.seproj.cloudhomework.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    UserRepository userRepository;

    @Override
    public User findUserById(int id) { return userRepository.findById(id); }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findUserByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
    public List<User> findUserByRole(int role) {
        return userRepository.findByRole(role);
    }

    @Override
    public void saveOrUpdate(User user) {
        userRepository.save(user);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
}
