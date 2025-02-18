package com.seproj.cloudhomework.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "homeworkanswer")
public class HomeworkAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    int homeworkId;
    String content;
    String picture;
}
