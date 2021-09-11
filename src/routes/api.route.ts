import express from "express";
import { UserRoute } from "../lib/user/user.route";
import { CtfRoute } from '../lib/btg-ctf/ctf.route';
import { SchoolRoute } from '../lib/school/school.route';
import { MemberShipRoute } from "../lib/membership/membership.route";
import { TagRoute } from "../lib/tag/tag.route";
import { EventRoute } from '../lib/event/event.route';
import { CompanyRoute } from '../lib/company/company.route';
import { WorkerRoute } from "../lib/worker/worker.route";

export class ApiRoute {
  protected route: express.Router;
  private _userRoute: UserRoute;
  private _ctfRoute: CtfRoute;
  private _schoolRoute: SchoolRoute
  private _membershipRoute: MemberShipRoute
  private _tagRoute: TagRoute
  private _eventRoute: EventRoute
  private _companyRoute: CompanyRoute
  private _workerRoute: WorkerRoute

  constructor() {
    this.route = express.Router();
    this._userRoute = new UserRoute();
    this._ctfRoute = new CtfRoute()
    this._schoolRoute = new SchoolRoute()
    this._membershipRoute = new MemberShipRoute()
    this._tagRoute = new TagRoute()
    this._eventRoute = new EventRoute()
    this._companyRoute = new CompanyRoute()
    this._workerRoute = new WorkerRoute()
  }

  public Routes = (status_monitor_route:any): express.Router => {
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

    this.route.use(this._userRoute.getPath(), this._userRoute.getRoutes());

    this.route.use(this._ctfRoute.getPath(), this._ctfRoute.getRoutes());

    this.route.use(this._schoolRoute.getPath(), this._schoolRoute.getRoutes());

    this.route.use(this._membershipRoute.getPath(), this._membershipRoute.getRoutes())

    this.route.use(this._tagRoute.getPath(), this._tagRoute.getRoutes())
    
    this.route.use(this._eventRoute.getPath(), this._eventRoute.getRoutes())

    this.route.use(this._companyRoute.getPath(), this._companyRoute.getRoutes())

    this.route.use(this._workerRoute.getPath(), this._workerRoute.getRoutes())
    
    this.route.use("/status" ,status_monitor_route)
    

    return this.route;
  };
}
