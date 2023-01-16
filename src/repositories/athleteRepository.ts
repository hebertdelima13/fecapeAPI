import { AppDataSource } from "../data-source";
import { Athlete } from "../entities/Athlete";

export const athleteRepository = AppDataSource.getRepository(Athlete);
