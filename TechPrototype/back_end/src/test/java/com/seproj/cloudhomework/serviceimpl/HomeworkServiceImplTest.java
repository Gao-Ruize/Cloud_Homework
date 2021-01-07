package com.seproj.cloudhomework.serviceimpl;

import com.seproj.cloudhomework.dao.HomeworkDao;
import com.seproj.cloudhomework.entity.Homework;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class HomeworkServiceImplTest {
    @Autowired
    private HomeworkServiceImpl homeworkServiceImpl;

    @MockBean
    private HomeworkDao homeworkDao;

    private List<Homework> homeworkList;

    @BeforeEach
    void setUp() {
        homeworkList = new ArrayList<>();
        homeworkList.add(new Homework("HomeworkName1",
                new Date(),
                new Date(),
                "HomeworkContent1",
                "CourseId"));
        homeworkList.add(new Homework("HomeworkName2",
                new Date(),
                new Date(),
                "HomeworkContent2",
                "CourseId"));

        Mockito.when(homeworkDao.findHomeworkByCourseId(Mockito.anyString())).thenAnswer(
                new Answer<List<Homework>>(){
                    @Override
                    public List<Homework> answer(InvocationOnMock invocationOnMock) throws Throwable {
                        return homeworkList;
                    }
                }
        );
        Mockito.when(homeworkDao.findHomeworkByNameLike(Mockito.anyString())).thenAnswer(
                new Answer<List<Homework>>(){
                    @Override
                    public List<Homework> answer(InvocationOnMock invocationOnMock) throws Throwable {
                        return homeworkList;
                    }
                }
        );
    }

    @Test
    void findHomeworkByCourseId() {
        assertEquals(homeworkList, homeworkServiceImpl.findHomeworkByCourseId("CourseId"));
    }

    @Test
    void findHomeworkByNameLike() {
        assertEquals(homeworkList, homeworkServiceImpl.findHomeworkByNameLike("Homework"));
    }

    @Test
    void saveOrUpdate() {
        Homework newHomework = new Homework("HomeworkName3",
                new Date(),
                new Date(),
                "newHomeworkContent",
                "CourseId");
        homeworkServiceImpl.saveOrUpdate(newHomework);
    }
}