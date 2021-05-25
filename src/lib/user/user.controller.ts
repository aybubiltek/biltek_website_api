import { NextFunction, Response, Router } from "express";
import { AuthRequest, PublicRequest } from "../../@types";
import IController from "../../interfaces/IController";
import { UserDto } from "./user.dto";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { BadRequest } from "../../errors/http-errors";
import { logIn, logOut } from "../../auth";
import { DocumentType } from "@typegoose/typegoose";

export class UserController implements IController {
  private _userService: UserService;

  path = "/user";
  router = Router();

  constructor() {
    this._userService = new UserService();
  }

  public addUser = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let userDto: UserDto = new UserDto();
      userDto = req.body as UserDto;
      let result;

      result = await this._userService.create(userDto);

      res.status(201).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
      });
    }
  };

  public getUser = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this._userService.find({}, {});
      const userDto: UserDto[] = (result as unknown) as UserDto[];

      res.status(200).json({
        status: "success",
        data: userDto,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
      });
    }
  };

  public login = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const userDto = (await this._userService.findOne(
        { email: email },
        {},
        {}
      )) as DocumentType<User>;

      if (!userDto || !(await userDto.matchesPassword(password))) {
        throw new BadRequest("Incorrect email or password");
      }

      logIn(req, userDto._id.toHexString());

      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
      });
    }
  };

  public register = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, name_surname, password } = req.body;
      const found = await this._userService.findOne(
        { email: email },
        {},
        { lean: true }
      );

      if (found) {
        throw new BadRequest("Invalid email");
      }

      const user = (await this._userService.create(
        req.body as UserDto
      )) as DocumentType<User>;

      logIn(req, user._id.toHexString());

      const link = user.verificationUrl(user._id.toHexString());

      console.log(link);

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
      });
    }
  };

  public logout = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await logOut(req, res);

      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
      });
    }
  };
}
