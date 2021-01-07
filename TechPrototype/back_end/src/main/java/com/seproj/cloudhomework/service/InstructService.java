package com.seproj.cloudhomework.service;

import com.seproj.cloudhomework.entity.Instruct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface InstructService {
    List<Instruct> findByCourseId(int courseId);
}
