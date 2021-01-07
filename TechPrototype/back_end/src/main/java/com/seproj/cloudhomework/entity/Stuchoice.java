package com.seproj.cloudhomework.entity;


import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "stuchoice")
public class StuChoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    int studentId;
    int choiceId;
    int answer;
    Date commitTime;
    int grade;
}
