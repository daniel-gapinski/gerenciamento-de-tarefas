import serverless from "serverless-http";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gerenciamento de Tarefas',
            version: '1.0.0',
            description: 'Documentação da API de tarefas',
        },
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cors());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Erro interno do servidor!",
    });
});

export const main = serverless(app);
