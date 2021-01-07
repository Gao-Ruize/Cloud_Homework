package com.seproj.cloudhomework.service;

import com.seproj.cloudhomework.entity.Stuchoice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StuchoiceService {
    Stuchoice save(Stuchoice stuchoice);
    List<Stuchoice> findAllByStudentid(int studentid);
    Stuchoice findDistinctByStudentidAndChoiceid(int studentid, int choiceid);
}
