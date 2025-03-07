import prismaClient from "../../prisma";

interface CategoryProps {
    id: string;
    name: string;
    user_id: string;
}

class RegisterCategoryService {

    async execute({ id, name, user_id }: CategoryProps) {

        if(!name) {
            throw new Error("Preencha o campo categoria!");
        }

        const userExists = await prismaClient.user.findUnique({
           where: {
            id: user_id,
           }
        })

        if(!userExists) {
            throw new Error("Usuário não encontrado!");
            
        }

        const registerCategory = await prismaClient.category.create({
            data: {
                id,
                name,
                user_id,
            }
        });

        return registerCategory;
    }
}

export { RegisterCategoryService };