package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.StuchoiceDao;
import com.seproj.cloudhomework.entity.Stuchoice;
import com.seproj.cloudhomework.service.StuchoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StuchoiceServiceImpl implements StuchoiceService {
    @Autowired
    StuchoiceDao stuchoiceDao;

    @Override
    public Stuchoice save(Stuchoice stuchoice) {
        return stuchoiceDao.save(stuchoice);
    }

    @Override
    public List<Stuchoice> findAllByStudentid(int studentid) {
        return stuchoiceDao.findAllByStudentid(studentid);
    }

    @Override
    public Stuchoice findDistinctByStudentidAndChoiceid(int studentid, int choiceid) {
        return stuchoiceDao.findDistinctByStudentidAndChoiceid(studentid, choiceid);
    }
}
