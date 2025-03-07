import { Request, Response } from "express";
import { ListTasksService } from "../../Services/Tasks/ListTasksService";

class ListTasksController {

    async handle(req: Request, res: Response) {

        const listTasks = new ListTasksService();

        const tasks = await listTasks.execute();

        return res.json(tasks);
    }
}

export { ListTasksController };