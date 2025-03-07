//Criando uma tipagem própria para o user_id do middleware isAutenticated

declare namespace Express {
    export interface Request{
        user_id: string;
    }
}