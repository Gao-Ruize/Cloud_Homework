package com.seproj.cloudhomework.daoimpl;

import com.seproj.cloudhomework.dao.HomeworkAnswerDao;
import com.seproj.cloudhomework.entity.HomeworkAnswer;
import com.seproj.cloudhomework.repository.HomeworkAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HomeworkAnswerDaoImpl implements HomeworkAnswerDao {
    @Autowired
    HomeworkAnswerRepository homeworkAnswerRepository;

    @Override
    public List<HomeworkAnswer> findHomeworkAnswerByHomeworkId(int homeworkId) {
        return homeworkAnswerRepository.findByHomeworkId(homeworkId);
    }
}
