import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { MulterRequest } from "../@types/multer";
// import { cloudinary } from "../helpers/cloudinary";

export class AuthController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name) {
      throw new BadRequestError("Digite um nome!");
    }

    if (!email) {
      throw new BadRequestError("Digite um e-mail!");
    }

    const findUser = await userRepository.findOneBy({ email });

    if (findUser) {
      throw new BadRequestError("E-mail já cadastrado!");
    }

    if (!password) {
      throw new BadRequestError("Digite uma senha!");
    }

    // if (!(req as MulterRequest).file) {
    //   throw new BadRequestError("Insira uma imagem!");
    // }

    const hashPassword = await bcrypt.hash(password, 10);

    // const result = await cloudinary.v2.uploader.upload(
    //   (req as MulterRequest).file.path,
    //   {
    //     folder: "avatar",
    //   }
    // );

    const newUser = userRepository.create({
      name,
      email,
      // image: result.secure_url,
      password: hashPassword,
    });

    await userRepository.save(newUser);

    const { password: _, ...user } = newUser;

    res.json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email && !password) {
      throw new BadRequestError("Digite o e-mail e senha para entrar");
    }

    const findUser = await userRepository.findOneBy({ email });

    if (!findUser) {
      throw new BadRequestError("E-mail ou senha inválidos!");
    }

    const verifyPassword = await bcrypt.compare(password, findUser.password);

    if (!verifyPassword) {
      throw new BadRequestError("E-mail ou senha inválidos!");
    }

    const token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "8h",
    });

    const { password: _, ...userLogin } = findUser;

    return res.json({
      user: userLogin,
      token: token,
    });
  }

  async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}
