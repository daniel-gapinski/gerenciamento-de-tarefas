import { Request, Response } from "express";
import { UpdateTaskService } from "../../Services/Tasks/UpdateTaskService";

class UpdateTaskController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        const { id, status, priority } = req.body;

        console.log("id da task", id)

        const updated_at = new Date();

        const updateTask = new UpdateTaskService();

        const update = await updateTask.execute({
            id,
            user_id,
            status,
            priority,
            updated_at,
        });

        return res.json(update);
    }
}

export { UpdateTaskController };