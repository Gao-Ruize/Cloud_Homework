package com.seproj.cloudhomework.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "choice")
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    int courseId;
    String content;
    String choiceA;
    String choiceB;
    String choiceC;
    String choiceD;
    Date deadline;

}
