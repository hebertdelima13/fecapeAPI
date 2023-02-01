import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export class UserController {
  async listUsers(req: Request, res: Response) {
    const users = await userRepository.find({
      select: ["id", "name", "email"],
    });

    res.json(users);
  }

  async findByIdUser(req: Request, res: Response) {
    const { idUser } = req.params;

    const findUser = await userRepository.findOneBy({
      id: idUser,
    });

    if (!findUser) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    await userRepository.find();

    const { password: _, ...user } = findUser;

    res.json(user);
  }

  async updateUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const { idUser } = req.params;

    const finByIdUser = await userRepository.findOneBy({ id: idUser });
    const findEmail = await userRepository.findOneBy({ email: email });

    if (!finByIdUser) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    if (!name) {
      throw new BadRequestError("Digite um nome para o usuário!");
    }

    if (email) {
      if (findEmail && email != finByIdUser.email) {
        throw new BadRequestError("E-mail já cadastrado!");
      }
    }

    if (!password) {
      throw new BadRequestError("Digite uma senha para o usuário!");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const updateUser = {
      ...finByIdUser,
      name,
      email,
      password: hashPassword,
    };

    await userRepository.save(updateUser);

    const { password: _, ...user } = updateUser;

    return res.status(201).json(user);
  }

  async deleteUser(req: Request, res: Response) {
    const { idUser } = req.params;

    const findUser = await userRepository.findOneBy({ id: idUser });

    if (!findUser) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    await userRepository.delete(idUser);
    return res.status(204).json({ mensagem: "Usuário deletado com sucesso!" });
  }
}
