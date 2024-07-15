declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string | number | jwt.JwtPayload;
      };
    }
  }
}

export {};
