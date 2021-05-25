
import express from "express";
import { AuthRequest } from "../@types";
import { logIn, logOut } from "../auth";
import { BadRequest } from "../errors/http-errors";
import { UserDto } from "../lib/user/user.dto";
import UserModel, { User } from "../lib/user/user.model";
import { UserRepository } from "../lib/user/user.repository";
import { UserRoute } from "../lib/user/user.route";
import { checkIsLoggedIn, guest } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validaton.middleware";

export class ApiRoute {
  protected route: express.Router;
  private _userRoute: UserRoute;

  constructor() {
    this.route = express.Router();
    this._userRoute = new UserRoute();
  }

  public Routes = (): express.Router => {
    this.route.get(
      "/",
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(200).json({
          status: "success",
          message: "Api is working",
        });
      }
    );

    this.route.use(this._userRoute.getPath(), this._userRoute.UserRoutes());

    return this.route;
  };
}
