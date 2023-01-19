import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { athleteRepository } from "../repositories/athleteRepository";
import { championshipRepository } from "../repositories/championshipRepository";
import { resultRepository } from "../repositories/resultReposityory";

export class ResultController {
  async ListResults(req: Request, res: Response) {
    const result = await resultRepository.find({
      relations: {
        championship: true,
        athlete: true,
      },
    });
    return res.json(result);
  }

  async findByIdResult(req: Request, res: Response) {
    const { idResult } = req.params;
    const result = await resultRepository.find({
      where: { id: idResult },
      relations: {
        championship: true,
      },
    });

    if (!result) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    return res.json(result);
  }

  async createResult(req: Request, res: Response) {
    const {
      idChampionship,
      board,
      sort,
      scores,
      idAthlete,
      quantity,
      totalWeight,
      greaterWeight,
      lostPoints,
    } = req.body;

    // const { idChampionship } = req.params;

    const championship = await championshipRepository.findOneBy({
      id: idChampionship,
    });

    if (!championship) {
      throw new BadRequestError("Nenhuma prova encontrada!");
    }

    if (!board) {
      throw new BadRequestError("Digite uma placa!");
    }

    if (!sort) {
      throw new BadRequestError("Digite o sorteio!");
    }

    if (!scores) {
      throw new BadRequestError("Escolha se o atleta pontua ou não!");
    }

    const athlete = await athleteRepository.findOneBy({
      id: idAthlete,
    });

    if (!athlete) {
      throw new BadRequestError("Nenhuma prova encontrada!");
    }

    if (!quantity) {
      throw new BadRequestError("Digite a quantidade de peixes pescado!");
    }

    if (!totalWeight) {
      throw new BadRequestError("Digite o peso total dos peixes!");
    }

    if (!greaterWeight) {
      throw new BadRequestError("Digite o maior peso de um peixe pescado!");
    }

    if (!lostPoints) {
      throw new BadRequestError("Digite quantos pontos o atleta perdeu!");
    }

    const points = Math.ceil(
      quantity * 2 + (totalWeight / 100) * 1 - lostPoints
    );

    const newResult = resultRepository.create({
      board,
      sort,
      scores,
      athlete,
      quantity,
      totalWeight,
      greaterWeight,
      points,
      lostPoints,
      championship,
    });

    await resultRepository.save(newResult);
    return res.json(newResult);
  }

  async updateResultado(req: Request, res: Response) {
    const {
      idChampionship,
      board,
      sort,
      scores,
      idAthlete,
      quantity,
      totalWeight,
      greaterWeight,
      lostPoints,
    } = req.body;

    const { idResult } = req.params;

    const championship = await championshipRepository.findOneBy({
      id: idChampionship,
    });

    if (!championship) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    const result = await resultRepository.findOneBy({
      id: idResult,
    });

    if (!result) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    if (!board) {
      throw new BadRequestError("Digite uma placa!");
    }

    if (!sort) {
      throw new BadRequestError("Digite o sorteio!");
    }

    if (!scores) {
      throw new BadRequestError("Escolha se o atleta pontua ou não!");
    }

    const athlete = await athleteRepository.findOneBy({
      id: idAthlete,
    });

    if (!athlete) {
      throw new BadRequestError("Nenhuma prova encontrada!");
    }

    if (!quantity) {
      throw new BadRequestError("Digite a quantidade de peixes pescado!");
    }

    if (!totalWeight) {
      throw new BadRequestError("Digite o peso total dos peixes!");
    }

    if (!greaterWeight) {
      throw new BadRequestError("Digite o maior peso de um peixe pescado!");
    }

    if (!lostPoints) {
      throw new BadRequestError("Digite quantos pontos o atleta perdeu!");
    }

    const points = Math.ceil(
      quantity * 2 + (totalWeight / 100) * 1 - lostPoints
    );

    const updateResult = {
      ...result,
      board,
      sort,
      scores,
      athlete,
      quantity,
      totalWeight,
      greaterWeight,
      lostPoints,
      points,
      championship,
    };

    await resultRepository.save(updateResult);

    return res.status(201).json(updateResult);
  }

  async deleteResult(req: Request, res: Response) {
    const { idChampionship, idResult } = req.params;
    const championship = await championshipRepository.findOneBy({
      id: idChampionship,
    });

    if (!championship) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    const result = await resultRepository.findOneBy({
      id: idResult,
    });

    if (!result) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    await resultRepository.delete(idResult);
    return res.status(204).json({ message: "Resultado deletado com sucesso!" });
  }
}
