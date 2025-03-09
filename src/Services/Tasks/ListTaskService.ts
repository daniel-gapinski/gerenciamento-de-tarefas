import prismaClient from "../../prisma";

class ListTaskService {

    async execute(id: string) {

        const tasks = await prismaClient.task.findFirst({
            where: {
                id: id,
            },
            include: {
                category: {
                    select: {
                        name: true,
                    }
                },
                Comments: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        user: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            }
        });

        return tasks;
    }
}

export { ListTaskService };