export type User = {
  name: string;
  nickname: string;
  email: string;
};

export type Task = {
  title: string;
  description: string;
  limit_date: string;
  creator_user_id: number;
};

// Tipos utilizados com os dados que retornam da consulta no banco de dados.

export type DbUser = {
  id: number;
  name: string;
  nickname: string;
  email: string;
};

export type DbTask = {
  id: number;
  title: string;
  description: string;
  status: string;
  limit_date: string;
  creator_user_id: number;
};

// Tipo com join na tabela TASK e na tabela USER

export type UserAndTask = {
  id: number;
  task_id: number;
  title: string;
  description: string;
  status: string;
  limit_date: Date;
  creator_user_id: number;
  name: string;
  nickname: string;
  email: string;
};
