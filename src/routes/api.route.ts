import { DocumentType } from "@typegoose/typegoose";
import express from "express";
import { AuthRequest } from "../@types";
import { logIn, logOut } from "../auth";
import { BadRequest } from "../errors/http-errors";
import { UserDto } from "../lib/user/user.dto";
import UserModel, { User } from "../lib/user/user.model";
import { UserRepository } from "../lib/user/user.repository";
import { checkIsLoggedIn, guest } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validaton.middleware";

export class ApiRoute {
  protected route: express.Router;

  constructor() {
    this.route = express.Router();
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

    this.route.post(
      "/user",
      validationMiddleware(UserDto, {
        validator: { skipMissingProperties: true, stopAtFirstError: false },
      }),
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        let userDto: UserDto = new UserDto();
        userDto = req.body as UserDto;
        let result;

        const repository: UserRepository = new UserRepository(UserModel);
        result = await repository.create(userDto);

        res.status(201).json({
          status: "success",
          data: result,
        });
      }
    );

    this.route.get(
      "/user",
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const repository: UserRepository = new UserRepository(UserModel);
        const result = await repository.find({}, {}, { lean: true });
        const userDto: UserDto[] = (result as unknown) as UserDto[];
        res.status(200).json({
          status: "success",
          data: userDto,
        });
      }
    );

    this.route.post(
      "/login",
      guest(),
      async (
        req: AuthRequest,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const { email, password } = req.body;
        const repository: UserRepository = new UserRepository(UserModel);
        const userDto = (await repository.findOne(
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
      }
    );

    this.route.post(
      "/register",
      guest(),
      async (
        req: AuthRequest,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const { email, name_surname, password } = req.body;
        const repository: UserRepository = new UserRepository(UserModel);
        const found = await repository.findOne(
          { email: email },
          {},
          { lean: true }
        );
        if (found) {
          throw new BadRequest("Invalid email");
        }

        const user = await repository.create(req.body as UserDto);

        logIn(req, user._id.toHexString());

        const link = user.verificationUrl(user._id.toHexString());

        console.log(link);

        res.status(200).json({
          status: "success",
          data: user,
        });
      }
    );

    this.route.post(
      "/logout",
      checkIsLoggedIn(),
      async (
        req: AuthRequest,
        res: express.Response,
        next: express.NextFunction
      ) => {
        await logOut(req, res);

        res.status(200).json({
          status: "success",
        });
      }
    );

    return this.route;
  };
}
