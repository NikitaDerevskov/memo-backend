import express from 'express';
import { Knex } from 'knex';
import { RedisClientType } from '../types/UtilsTypes';

export const createFolder = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
  redisClient: RedisClientType,
) => {
  const authorization = req.headers?.authorization || '';
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

// TODO add pagination
export const getFolders = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
  redisClient: RedisClientType,
) => {
  const authorization = req.headers?.authorization || '';
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

/* TODO don't really delete folder, just mark as deleted! */
// TODO add if error
/* TODO this is looks same as delete card :), merge it */
export const deleteFolder = (
  async (
    req: express.Request,
    res: express.Response,
    db: Knex<any, unknown[]>,
  ) => {
    const { folderId } = req.query;

    await db('folders')
      .where('id', Number(folderId))
      .del();

    return res.status(200).send('Success');
  });

/* TODO user can modife only his folders */
export const editFolder = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
) => {
  const { title, folderId } = req.body;

  await db('folders')
    .where('id', Number(folderId))
    .update({ title });

  /* TODO add error handling */

  return res.status(200).send('Success');
};
