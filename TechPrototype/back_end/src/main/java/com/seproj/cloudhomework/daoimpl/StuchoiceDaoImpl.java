package com.seproj.cloudhomework.daoimpl;

import com.seproj.cloudhomework.dao.StuchoiceDao;
import com.seproj.cloudhomework.entity.Stuchoice;
import com.seproj.cloudhomework.repository.StuchoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StuchoiceDaoImpl implements StuchoiceDao {
    @Autowired
    StuchoiceRepository stuchoiceRepository;

    @Override
    public Stuchoice save(Stuchoice stuchoice) {
        return stuchoiceRepository.save(stuchoice);
    }

    @Override
    public List<Stuchoice> findAllByStudentid(int studentid) {
        return stuchoiceRepository.findAllByStudentid(studentid);
    }

    @Override
    public Stuchoice findDistinctByStudentidAndChoiceid(int studentid, int choiceid) {
        return stuchoiceRepository.findDistinctByStudentidAndChoiceid(studentid, choiceid);
    }
}
