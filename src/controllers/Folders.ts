import express from 'express';
import { Knex } from 'knex';
import { RedisClientType } from '../types/UtilsTypes';

export const createFolder = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
  redisClient: RedisClientType,
) => {
  const authorization = req.headers?.authorization?.split(' ')[1] || '';
  const { title } = req.body;

  if (!title) {
    return res.status(400).json('Title is required');
  }

  const id = await redisClient.get(authorization);
  await db('folders').insert({
    title, created: new Date().toISOString(), user_id: id,
  }).catch(() => res.status(500).json('Error in insert data in db'));

  return res.status(201).json('Folder created');
};

export const renameFolder = () => 0;

// TODO add pagination
export const getFolders = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
  redisClient: RedisClientType,
) => {
  const authorization = req.headers?.authorization?.split(' ')[1] || '';
  const id = await redisClient.get(authorization);

  const folders = await db('folders')
    .where('user_id', id)
    //  Add log
    .catch(() => {
      res.status(500).json('Error in get folders with this user id');
      return [];
    });

  // TODO is it right?
  return res.status(200).json(folders);
};

export const getFolder = () => 0;
export const deleteFolder = () => 0;
