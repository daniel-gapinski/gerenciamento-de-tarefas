import { Request, Response } from "express";
import { RegisterCategoryService } from "../../Services/Categories/RegisterCategoryService";

class RegisterCategoryController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        const { id, name } = req.body;

        const registerCategory = new RegisterCategoryService();

        const category = await registerCategory.execute({
            id,
            name,
            user_id,
        });

        return res.json(category);
    }
}

export { RegisterCategoryController };