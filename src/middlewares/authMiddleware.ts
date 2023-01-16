import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
  id: string;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Não autorizado!");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayload;

  const userFind = await userRepository.findOneBy({ id });

  if (!userFind) {
    throw new UnauthorizedError("Não autorizado!");
  }

  const { password: _, ...loggedUser } = userFind;

  req.user = loggedUser;

  next();
};
