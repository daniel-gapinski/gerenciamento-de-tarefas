import prismaClient from "../../prisma";

class GetUserService {

    async execute(user_id: string) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id,
            }
        });

        return user;

    }
}

export { GetUserService };