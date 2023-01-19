import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { athleteRepository } from "../repositories/athleteRepository";
import { clubRepository } from "../repositories/clubRepository";

export class AthleteController {
  async listAthletes(req: Request, res: Response) {
    const athletes = await athleteRepository.find({
      relations: {
        club: true,
        results: {
          championship: true,
        },
      },
    });

    return res.json(athletes);
  }

  async findByIdAthlete(req: Request, res: Response) {
    const { idAthlete } = req.params;

    const findAthlete = await athleteRepository.findOneBy({
      id: idAthlete,
    });

    if (!findAthlete) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    const athlete = await athleteRepository.find({
      where: { id: idAthlete },
      relations: {
        club: true,
        results: {
          championship: true,
        },
      },
    });

    return res.json(athlete);
  }

  async createAthlete(req: Request, res: Response) {
    const { name, club } = req.body;
    // const { idClub } = req.params;

    const clubFind = await clubRepository.findOneBy({
      id: club,
    });

    if (!clubFind) {
      throw new BadRequestError("Nenhum clube encontrado!");
    }

    if (!name) {
      throw new BadRequestError("Digite um nome para o atleta!");
    }

    const athleteFind = await athleteRepository.findOneBy({ name });

    if (athleteFind) {
      throw new BadRequestError("Nome de atleta já cadastrado!");
    }

    const newAthlete = athleteRepository.create({
      name,
      club,
    });

    await athleteRepository.save(newAthlete);
    return res.json(newAthlete);
  }

  async updateAthlete(req: Request, res: Response) {
    const { name, club } = req.body;
    const { idAthlete } = req.params;

    const findByIdAthlete = await athleteRepository.findOneBy({
      id: idAthlete,
    });

    if (!findByIdAthlete) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    if (!name) {
      throw new BadRequestError("Digite um nome para o atleta!");
    }

    const findAthlete = await athleteRepository.findOneBy({ name });

    if (findAthlete) {
      throw new BadRequestError("Nome de atleta já cadastrado!");
    }

    if (!club) {
      throw new BadRequestError("Digite um clube para o atleta!");
    }

    const updateAthlete = {
      ...findByIdAthlete,
      name,
      club,
    };

    await athleteRepository.save(updateAthlete);

    return res.status(201).json(updateAthlete);
  }

  async deleteAthlete(req: Request, res: Response) {
    const { idAthlete } = req.params;

    const findAthlete = athleteRepository.findOneBy({ id: idAthlete });

    if (!findAthlete) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    await athleteRepository.delete(idAthlete);
    return res.status(204).json({ mensagem: "Atleta deletado com sucesso!" });
  }
}
