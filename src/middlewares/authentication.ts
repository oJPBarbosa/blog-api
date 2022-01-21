import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { USER_SESSION_SECRET } from '../utils/secrets';

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void => {
  const bearer: string = request.headers.authorization;

  if (!bearer) {
    return response.status(401).json({ error: 'Token not provided.' });
  }

  const [, token] = bearer.split(' ');

  try {
    verify(token, USER_SESSION_SECRET);

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Invalid token.' });
  }
};
