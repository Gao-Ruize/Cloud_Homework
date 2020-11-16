package com.seproj.cloudhomework.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "instruct")
public class Instruct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;
    int courseId;
    int teacherId;
    int studentId;
}
