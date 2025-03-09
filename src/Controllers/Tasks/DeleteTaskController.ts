import { Request, Response } from "express";
import { DeleteTaskService } from "../../Services/Tasks/DeleteTaskService";

class DeleteTaskController {

    async handle(req: Request, res: Response) {

        const id  = req.query.id as string;

        console.log("id da requisicao", id)

        const deleteTask = new DeleteTaskService();
        const task = await deleteTask.execute(id);

        return res.json(task);
        
    }
}

export { DeleteTaskController };