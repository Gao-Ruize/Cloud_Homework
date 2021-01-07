package com.seproj.cloudhomework.dao;

import com.seproj.cloudhomework.entity.Stuchoice;

import java.util.List;

public interface StuchoiceDao {
    Stuchoice save(Stuchoice stuchoice);
    List<Stuchoice> findAllByStudentid(int studentid);
    Stuchoice findDistinctByStudentidAndChoiceid(int studentid, int choiceid);
}
