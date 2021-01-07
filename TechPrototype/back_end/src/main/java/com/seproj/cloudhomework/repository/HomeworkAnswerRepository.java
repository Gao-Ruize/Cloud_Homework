package com.seproj.cloudhomework.repository;

import com.seproj.cloudhomework.entity.HomeworkAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

import java.util.List;

public interface HomeworkAnswerRepository extends JpaRepository<HomeworkAnswer, Integer> {
    List<HomeworkAnswer> findByHomeworkId(int homeworkId);
}
