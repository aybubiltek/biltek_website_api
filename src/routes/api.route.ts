import express from "express";
import { UserRoute } from "../lib/user/user.route";
import { CtfRoute } from '../lib/btg-ctf/ctf.route';

export class ApiRoute {
  protected route: express.Router;
  private _userRoute: UserRoute;
  private _ctfRoute : CtfRoute;

  constructor() {
    this.route = express.Router();
    this._userRoute = new UserRoute();
    this._ctfRoute = new CtfRoute()
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

    this.route.use(this._ctfRoute.getPath(), this._ctfRoute.CtfRoutes());

    return this.route;
  };
}
