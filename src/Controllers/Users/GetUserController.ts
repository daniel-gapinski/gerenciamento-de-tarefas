import { Request, Response } from "express";
import { GetUserService } from "../../Services/Users/GetUserService";

class GetUserController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;

        const getUser = new GetUserService();

        const user = await getUser.execute(user_id);

        return res.json(user);
    }
}

export { GetUserController }; 