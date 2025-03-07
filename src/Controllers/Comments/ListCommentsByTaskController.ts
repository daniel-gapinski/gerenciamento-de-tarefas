import { Request, Response } from "express";
import { ListCommentsByTaskService } from "../../Services/Comments/ListCommentsByTaskService";

class ListCommentsByTaskController {

    async handle(req: Request, res: Response) {

        const { task_id } = req.params;

        const listComments = new ListCommentsByTaskService();

        const comments = await listComments.execute({
            task_id,
        });

        return res.json(comments);
    }
}

export { ListCommentsByTaskController };