package com.seproj.cloudhomework.repository;

import com.seproj.cloudhomework.entity.Stuchoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StuchoiceRepository extends JpaRepository<Stuchoice, Integer> {
    Stuchoice save(Stuchoice stuchoice);
    List<Stuchoice> findAllByStudentid(int studentid);
    Stuchoice findDistinctByStudentidAndChoiceid(int studentid, int choiceid);
}
