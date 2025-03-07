import { Request, Response } from "express";
import { RegisterTaskService } from "../../Services/Tasks/RegisterTaskService";

class RegisterTaskController {

    async handle(req: Request, res: Response) {
        
        const user_id = req.user_id;
        const { id, title, description, status, priority, category_id } = req.body;

        const registerTask = new RegisterTaskService();
        const register = await registerTask.execute({
            id,
            title,
            description,
            status,
            priority,
            category_id,
            user_id,
        });

        return res.json(register);
    }
}

export { RegisterTaskController };