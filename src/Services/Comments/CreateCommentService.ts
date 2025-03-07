import prismaClient from "../../prisma";

interface CommentProps {
    id: string;
    content: string;
    task_id: string;
    user_id: string;
}

class CreateCommentService {

    async execute({ id, content, task_id, user_id }: CommentProps) {

        const taskExists = await prismaClient.task.findFirst({
            where: {
                id: task_id,
            },
        });

        if(!taskExists) {
            throw new Error("Tarefa não encontrada!");
            
        }

        const userExists = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
        });

        if(!userExists) {
            throw new Error("Usuário não encontrado!");
        }

        const comment = await prismaClient.comment.create({
            data: {
                id: id,
                content: content,
                task_id: task_id,
                user_id: user_id,
            },
            include: {
                user: {
                    select: {
                        name: true, 
                        email: true,
                    }
                },
            },
        });

        return comment;
    }
}

export { CreateCommentService };