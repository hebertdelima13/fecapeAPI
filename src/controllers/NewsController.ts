import { Request, Response } from "express";
import { MulterRequest } from "../@types/multer";
import { BadRequestError } from "../helpers/api-errors";
import { cloudinary } from "../helpers/cloudinary";
import { newsRepository } from "../repositories/newsRepository";

export class NewsController {
  async listNews(req: Request, res: Response) {
    const news = await newsRepository.find({
      select: ["id", "title", "createdAt", "content", "image"],
    });

    res.json(news);
  }

  async findByIdNews(req: Request, res: Response) {
    const { idNews } = req.params;

    const findNews = await newsRepository.findOneBy({
      id: idNews,
    });

    if (!findNews) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    const news = await newsRepository.find({
      where: { id: idNews },
    });

    return res.json(news);
  }

  async createNews(req: Request, res: Response) {
    const { title, content } = req.body;

    if (!title) {
      throw new BadRequestError("Digite um título para notícia!");
    }

    if (!content) {
      throw new BadRequestError("Digite o conteúdo da notícia!");
    }

    if (!(req as MulterRequest).file) {
      throw new BadRequestError("Insira uma imagem!");
    }

    const result = await cloudinary.v2.uploader.upload(
      (req as MulterRequest).file.path,
      {
        folder: "news",
      }
    );

    const newNews = newsRepository.create({
      title,
      content,
      image: result.secure_url,
    });

    await newsRepository.save(newNews);
    return res.json(newNews);
  }

  async deleteNews(req: Request, res: Response) {
    const { idNews } = req.params;

    const findNews = await newsRepository.findOneBy({ id: idNews });

    if (!findNews) {
      throw new BadRequestError("Nenhum id encontrado!");
    }

    await newsRepository.delete(idNews);
    return res.status(204).json({ mensagem: "Notícia deletada com sucesso!" });
  }
}
