import { AppDataSource } from "../data-source";
import { Championship } from "../entities/Championship";

export const championshipRepository = AppDataSource.getRepository(Championship);
