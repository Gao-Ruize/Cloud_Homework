package com.seproj.cloudhomework.repository;

import com.seproj.cloudhomework.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findByUserId(String userId);
    List<User> findByRole(int role);
}
