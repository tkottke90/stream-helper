import express from 'express';

export function createHostStr(req: express.Request) {
  return `${req.protocol}://${req.app.get('domain')}`;
}
