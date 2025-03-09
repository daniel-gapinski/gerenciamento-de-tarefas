import { Request, Response } from "express";
import { ListTaskService } from "../../Services/Tasks/ListTaskService";

class ListTaskController {

    async handle(req: Request, res: Response) {

        const id = req.params.id as string;

        console.log("id recebifo", id);

        const listTask = new ListTaskService();

        const task = await listTask.execute(id);

        return res.json(task);
    }
}

export { ListTaskController };