import prismaClient from "../../prisma";

class ListTasksService {

    async execute() {

        const tasks = await prismaClient.task.findMany({
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

export { ListTasksService };