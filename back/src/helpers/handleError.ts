import { Response } from 'express';

const httpError = (res: Response, err: string) => {
  res.status(500);
  res.send({
    error: `Oops! An error occurred and your request couldn't be completed. Please try again.`,
  });
};

export { httpError };
