import express from 'express';
import { secret } from './config.js';
import film2media from './film2media/film2media.js';

const app = express();

function respond(res, data) {
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
}

// Middleware to validate token from request headers
app.use((req, res, next) => {
  const token = req.headers['x-proxy-auth'];
  if (token === secret) return next();

  return res.status(403).send('Forbidden: Invalid token');
});

app.get('/film2media-streams/:imdbId', async (req, res, next) => {
  const imdbId = req.params.imdbId;
  const mkvLinks = await film2media.getAllMkvLinks(imdbId);
  respond(res, mkvLinks);
});

export default app;
