import express from 'express';
import { Knex } from 'knex';

export const createCard = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
) => {
  const { folderId, content, title } = req.body;

  /* TODO refactor */
  if (!folderId) {
    return res.status(400).json('folderId is required');
  }
  if (!content) {
    return res.status(400).json('content is required');
  }
  if (!title) {
    return res.status(400).json('title is required');
  }

  await db('cards').insert({
    content,
    last_modified: new Date().toISOString(),
    folder_id: folderId,
    title,
  }).catch(() => res.status(500).json('Error in insert data in db'));

  return res.status(201).json('Card created');
};

export const changeCardTitle = () => 0;

export const createCardContent = () => 0;

export const getCards = async (
  req: express.Request,
  res: express.Response,
  db: Knex<any, unknown[]>,
) => {
  const { folderId } = req.query;
  if (!folderId) {
    return res.status(400).json('folderId is required');
  }

  const cards = await db('cards')
    .where('folder_id', Number(folderId))
  // TODO Add log
    .catch(() => {
      res.status(500).json('Error in get cards');
      return [];
    });

  // TODO is it right?
  return res.status(200).json(cards);
};

export const getCard = () => 0;

export const deleteCard = () => 0;

// TODO  only migrations library - watch it.
