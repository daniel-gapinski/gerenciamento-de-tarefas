import prismaClient from "../../prisma";

interface TaskProps {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    category_id: string;
    user_id: string;
}

class RegisterTaskService {

    async execute({ id, title, description, status, priority, category_id, user_id }: TaskProps) {

        if( !title || !description || !status || !priority || !category_id ) {
            throw new Error("Preencha todos os campos!");
            
        }

        const userExists = await prismaClient.user.findUnique({
            where: {
                id: user_id,
            }
        });

        if(!userExists) {
            throw new Error("Usuário não encontrado!");
            
        }

        const categoryExists = await prismaClient.category.findUnique({
            where: {
                id: category_id,
            }
        });

        if(!categoryExists) {
            throw new Error("Categoria não encontrada!");
            
        }

        const task = await prismaClient.task.create({
           data: {
            id: id,
            title: title,
            description: description,
            status: status,
            priority: priority,
            category_id: category_id,
            user_id: user_id,
           }
        })

        return task;
    }
}

export { RegisterTaskService };