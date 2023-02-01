import { AppDataSource } from "../data-source";
import { News } from "../entities/News";

export const newsRepository = AppDataSource.getRepository(News);
