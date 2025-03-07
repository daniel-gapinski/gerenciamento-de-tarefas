import { Request, Response } from "express";
import { GetUsersService } from "../../Services/Users/GetUsersService";

class GetUsersController {

    async handle(req: Request, res: Response) {

        const getUsers = new GetUsersService();

        const users = await getUsers.execute();

        return res.json(users);
    }
}

export { GetUsersController }; 