import { Request, Response } from "express";
import { RegisterUserService } from "../../Services/Users/RegisterUserService";

class RegisterUserController {

    async handle(req: Request, res: Response) {

        const { id, name, email, password } = req.body;

        const registerUserService = new RegisterUserService();
        
        const register = await registerUserService.execute({
            id,
            name,
            email,
            password,
        });
        
        return res.json(register);
    }
}

export { RegisterUserController };
