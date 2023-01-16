import { Router } from "express";
import { ChampionshipController } from "./controllers/ChampionshipController";
import { ResultController } from "./controllers/ResultController";
import { ClubController } from "./controllers/ClubController";
import { AthleteController } from "./controllers/AthleteController";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";

const routes = Router();

/*Auth*/

routes.post("/register", new AuthController().register);
routes.post("/login", new AuthController().login);
routes.get("/profile", new AuthController().getProfile);

/*Users*/
routes.get("/user", new UserController().listUsers);
routes.get("/user/:idUser", new UserController().findByIdUser);
routes.put("/user/:idUser", new UserController().updateUser);
routes.delete("/user/:idUser", new UserController().deleteUser);

/*Provas*/

routes.get("/championship", new ChampionshipController().listChampionship);
routes.get(
  "/prova/:idProva",
  new ChampionshipController().findByIdChampionship
);
routes.post("/championship", new ChampionshipController().createChampionship);
routes.put(
  "/championship/:idChampionship",
  new ChampionshipController().updateChampionship
);
routes.delete(
  "/championship/:idChampionship",
  new ChampionshipController().deleteChampionship
);

/*Resultados*/

routes.get("/result", new ResultController().ListResults);
routes.get("/result/:idResult", new ResultController().findByIdResult);
routes.post(
  "/championship/:idChampionship/result",
  new ResultController().createResult
);
routes.put(
  "/championship/:idChampionship/result/:idResult",
  new ResultController().updateResultado
);
routes.delete(
  "/championship/:idChampionship/result/:idResult",
  new ResultController().deleteResult
);

/*Clube */

routes.get("/club", new ClubController().listClub);
routes.get("/club/:idClub", new ClubController().findByIdClub);
routes.post("/club", new ClubController().createClub);
routes.put("/club/:idClub", new ClubController().updateclub);
routes.delete("/club/:idClub", new ClubController().deleteclub);

/*Atleta */

routes.get("/athlete", new AthleteController().listAthletes);
routes.get("/athlete/:idAthlete", new AthleteController().findByIdAthlete);
routes.post("/club/:idClub/Athlete", new AthleteController().createAthlete);
routes.put("/club/athlete/:idAthlete", new AthleteController().updateAthlete);
routes.delete(
  "/club/athlete/:idAthlete",
  new AthleteController().deleteAthlete
);

export default routes;
