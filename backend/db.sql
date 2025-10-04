drop database if exists workers_crud;

create database workers_crud;

use workers_crud;

create table workers(
    id int(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    age INT(5) NOT NULL,
    country VARCHAR(50) NOT NULL,
    position VARCHAR(100) NOT NULL,
    experience INT(5) NOT NULL
);