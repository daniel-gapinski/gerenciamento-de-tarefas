import prismaClient from "../../prisma";

interface CommentProps {
    task_id: string;
}

class ListCommentsByTaskService {

    async execute({ task_id}: CommentProps) {

        const taskExists = await prismaClient.task.findFirst({
            where: {
                id: task_id,
            },
        });

        if(!taskExists) {
            throw new Error("Tarefa não encontrada!");
        }

        const getComments = await prismaClient.comment.findMany({
            where: {
                task_id: task_id,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                task: {
                    select: {
                        title: true,
                        description: true,
                        status: true,
                        priority: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
            },
        });

        return getComments;
    }
}

export { ListCommentsByTaskService };