import { AppDataSource } from "../data-source";
import { Club } from "../entities/Club";

export const clubRepository = AppDataSource.getRepository(Club);
