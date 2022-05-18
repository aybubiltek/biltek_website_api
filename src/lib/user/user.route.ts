import { UserController } from "./user.controller";
import { Router } from "express";
import { validationMiddleware } from "../../middleware/validation.middleware";
import { UserDto } from "./user.dto";
import { checkIsLoggedIn, guest } from "../../middleware/auth.middleware";
import IRoute from "../../interfaces/IRoute";
import { checkAcl } from '../../middleware/acl.middleware';
import { users } from "../../applications/acl.module.conf.json";

export class UserRoute implements IRoute {
  private _userController: UserController;

  moduleName: string;

  constructor() {
    this._userController = new UserController();
    this.moduleName = users;
  }

  public getRoutes():Router{
    this._userController.router.post(
      "/",
      checkIsLoggedIn(),
      checkAcl(),
      validationMiddleware(UserDto, {
        validator: { skipMissingProperties: true, stopAtFirstError: false },
      }),
      this._userController.addUser
    );

    this._userController.router.get(
      "/",
      checkIsLoggedIn(),
      checkAcl(),
      this._userController.getUser
    );

    this._userController.router.post(
      "/login",
      guest(),
      this._userController.login
    );

    this._userController.router.post(
      "/register",
      checkIsLoggedIn(),
      checkAcl(),
      this._userController.register
    );

    this._userController.router.post(
      "/logout",
      checkIsLoggedIn(),
      this._userController.logout
    );

    this._userController.router.post(
      "/role",
      checkIsLoggedIn(),
      checkAcl(),
      this._userController.createRole
    );

    this._userController.router.get(
      "/role",
      checkIsLoggedIn(),
      checkAcl(),
      this._userController.getRoles
    );

    this._userController.router.get(
      "/acl",
      checkIsLoggedIn(),
      checkAcl(),
      this._userController.getAcls
    );

    this._userController.router.put(
      "/acl",
      checkIsLoggedIn(),
      checkAcl(),
      this._userController.addRoleToAcl
    )

    return this._userController.router;
  };

  public getPath = (): string => {
    return this._userController.path;
  };
}
