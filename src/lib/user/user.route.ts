import { UserController } from "./user.controller";
import { Router } from "express";
import { validationMiddleware } from "../../middleware/validaton.middleware";
import { UserDto } from "./user.dto";
import { checkIsLoggedIn, guest } from "../../middleware/auth.middleware";

export class UserRoute {
  private _userController: UserController;

  constructor() {
    this._userController = new UserController();
  }

  public UserRoutes = (): Router => {
    this._userController.router.post(
      "/",
      validationMiddleware(UserDto, {
        validator: { skipMissingProperties: true, stopAtFirstError: false },
      }),
      this._userController.addUser
    );

    this._userController.router.get(
      "/",
      checkIsLoggedIn(),
      this._userController.getUser
    );

    this._userController.router.post(
      "/login",
      guest(),
      this._userController.login
    );

    this._userController.router.post(
      "/register",
      guest(),
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
      this._userController.createRole
    );

    this._userController.router.get(
      "/role",
      checkIsLoggedIn(),
      this._userController.getRoles
    )

    return this._userController.router;
  };

  public getPath = (): string => {
    return this._userController.path;
  };
}
