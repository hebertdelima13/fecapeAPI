import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { championshipRepository } from "../repositories/championshipRepository";

export class ChampionshipController {
  async listChampionship(req: Request, res: Response) {
    const championship = await championshipRepository.find({
      relations: {
        results: {
          athlete: true,
        },
      },
    });

    return res.json(championship);
  }

  async findByIdChampionship(req: Request, res: Response) {
    const { idChampionship } = req.params;
    const findChampionship = await championshipRepository.findOneBy({
      id: idChampionship,
    });

    if (!findChampionship) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    const championship = await championshipRepository.find({
      where: { id: idChampionship },
      relations: {
        results: {
          athlete: true,
        },
      },
    });

    return res.json(championship);
  }

  async createChampionship(req: Request, res: Response) {
    const { name, registered, typeOfChamp, category, stage } = req.body;

    if (!name) {
      throw new BadRequestError("Digite um nome para o campeonato!");
    }

    if (!registered) {
      throw new BadRequestError(
        "Digite o número de inscritos para o campeonato!"
      );
    }

    if (!typeOfChamp) {
      throw new BadRequestError("Digite o tipo do campeonato!");
    }

    if (!category) {
      throw new BadRequestError("Digite a categoria do campeonato!");
    }

    if (!stage) {
      throw new BadRequestError("Digite a etapa do campeonato!");
    }

    const findChampionship = await championshipRepository.findOneBy({ name });

    if (findChampionship) {
      throw new BadRequestError("Nome de prova já cadastrado!");
    }

    const newChampionship = championshipRepository.create({
      name,
      registered,
      typeOfChamp,
      category,
      stage,
    });

    await championshipRepository.save(newChampionship);

    return res.json(newChampionship);
  }

  async updateChampionship(req: Request, res: Response) {
    const { name, registered, typeOfChamp, category, stage } = req.body;
    const { idChampionship } = req.params;

    const findByIdChampionship = await championshipRepository.findOneBy({
      id: idChampionship,
    });

    if (!findByIdChampionship) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    if (!name) {
      throw new BadRequestError("Digite um nome para o campeonato!");
    }

    const findChampionship = await championshipRepository.findOneBy({ name });

    if (findChampionship) {
      throw new BadRequestError("Nome do campeonato já cadastrado!");
    }

    if (!registered) {
      throw new BadRequestError(
        "Digite o número de inscritos para o campeonato!"
      );
    }

    if (!typeOfChamp) {
      throw new BadRequestError("Digite o tipo do campeonato!");
    }

    if (!category) {
      throw new BadRequestError("Digite a categoria do campeonato!");
    }

    if (!stage) {
      throw new BadRequestError("Digite a etapa do campeonato!");
    }

    const updateChampionship = {
      ...findByIdChampionship,
      name,
      registered,
      typeOfChamp,
      category,
      stage,
    };

    await championshipRepository.save(updateChampionship);

    return res.status(201).json(updateChampionship);
  }

  async deleteChampionship(req: Request, res: Response) {
    const { idChampionship } = req.params;

    const findChampionship = await championshipRepository.findOneBy({
      id: idChampionship,
    });

    if (!findChampionship) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    await championshipRepository.delete(idChampionship);
    return res.status(204).json({ mensagem: "Prova deletada com sucesso!" });
  }
}
