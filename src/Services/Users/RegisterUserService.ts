import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface UserProps {
    id: string;
    email: string;
    name: string;
    password: string;
}

class RegisterUserService {

    async execute({ id, name, email, password }: UserProps) {

        if(name === "" || email === "") {
            throw new Error("Nome e e-mail são campos obrigatórios!");
            
        }
        
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        });

        if(userAlreadyExists) {
            throw new Error("Usuário já cadastrado!");
            
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                id,
                name,
                email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
        
    }
}

export { RegisterUserService };