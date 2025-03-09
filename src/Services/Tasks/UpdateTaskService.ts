import prismaClient from "../../prisma";

interface TaskProps {
    id: string;
    status: string;
    priority: string;
    updated_at: Date | string;
    user_id: string;
    description: string;
    title: string;
}

class UpdateTaskService {

    async execute({ id, status, priority, updated_at, user_id, title, description }: TaskProps) {

        const userExists = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
        });

        if(!userExists) {
            throw new Error("Usuário não encontrado!");
            
        }

        const taskExists = await prismaClient.task.findFirst({
            where: {
                id: id,
            },
        });

        if(!taskExists) {
            throw new Error("Task não encontrada!");
            
        }

        const task = await prismaClient.task.update({
            where: {
                id: id,
            },
            data: {
                status: status,
                priority: priority,
                updated_at,
                description: description,
                title: title,
            },
        });

        return task;
    }
}

export { UpdateTaskService };