import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { clubRepository } from "../repositories/clubRepository";

export class ClubController {
  async listClub(req: Request, res: Response) {
    const clubs = await clubRepository.find({
      relations: {
        athletes: true,
      },
    });

    return res.json(clubs);
  }

  async findByIdClub(req: Request, res: Response) {
    const { idClub } = req.params;

    const findClub = await clubRepository.findOneBy({
      id: idClub,
    });

    if (!findClub) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    const club = await clubRepository.find({
      where: { id: idClub },
      relations: {
        athletes: true,
      },
    });

    return res.json(club);
  }

  async createClub(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      throw new BadRequestError("Digite um nome para o clube!");
    }

    const findClub = await clubRepository.findOneBy({ name });

    if (findClub) {
      throw new BadRequestError("Nome de clube já cadastrado!");
    }

    const newClub = clubRepository.create({ name });

    await clubRepository.save(newClub);
    return res.json(newClub);
  }

  async updateclub(req: Request, res: Response) {
    const { name } = req.body;
    const { idClub } = req.params;

    const findByIdClub = await clubRepository.findOneBy({
      id: idClub,
    });

    if (!findByIdClub) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    if (!name) {
      return res.status(400).json({ mensagem: "Digite um nome para o clube!" });
    }

    const findClub = await clubRepository.findOneBy({ name });

    if (findClub) {
      throw new BadRequestError("Nome de clube já cadastrado!");
    }

    const updateClub = {
      ...findByIdClub,
      name,
    };

    await clubRepository.save(updateClub);

    return res.status(201).json(updateClub);
  }

  async deleteclub(req: Request, res: Response) {
    const { idClub } = req.params;

    const findClub = clubRepository.findOneBy({ id: idClub });

    if (!findClub) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    await clubRepository.delete(idClub);
    return res.status(204).json({ mensagem: "Clube deletado com sucesso!" });
  }
}
