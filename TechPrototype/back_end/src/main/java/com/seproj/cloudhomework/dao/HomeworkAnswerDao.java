package com.seproj.cloudhomework.dao;

import com.seproj.cloudhomework.entity.HomeworkAnswer;

import java.util.List;

public interface HomeworkAnswerDao {
    List<HomeworkAnswer> findHomeworkAnswerByHomeworkId(int homeworkId);
}
