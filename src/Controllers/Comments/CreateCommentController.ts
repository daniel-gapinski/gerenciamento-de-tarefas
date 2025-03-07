import { Request, Response } from "express";
import { CreateCommentService } from "../../Services/Comments/CreateCommentService";

class CreateCommentController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        const { id, content, task_id} = req.body;

        const createComment = new CreateCommentService();
        
        const comment = await createComment.execute({
            id,
            user_id,
            task_id, 
            content,
        });

        return res.json(comment);
    }
}

export { CreateCommentController };