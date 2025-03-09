import { Router } from "express";

import { isAtutenticated } from "./middlewares/isAtutenticated";

import { RegisterUserController } from "./Controllers/Users/RegisterUserController";
import { AuthUserController } from "./Controllers/Users/AuthUserController";
import { GetUserController } from "./Controllers/Users/GetUserController";
import { GetUsersController } from "./Controllers/Users/GetUsersController";

import { RegisterTaskController } from "./Controllers/Tasks/RegisterTaskController";
import { ListTasksController } from "./Controllers/Tasks/ListTasksController";
import { ListTaskController } from "./Controllers/Tasks/ListTaskController";
import { UpdateTaskController } from "./Controllers/Tasks/UpdateTaskController";
import { DeleteTaskController } from "./Controllers/Tasks/DeleteTaskController";

import { RegisterCategoryController } from "./Controllers/Categories/RegisterCategoryController";
import { ListCategoriesController } from "./Controllers/Categories/ListCategoriesController";

import { CreateCommentController } from "./Controllers/Comments/CreateCommentController";
import { ListCommentsByTaskController } from "./Controllers/Comments/ListCommentsByTaskController";


const router = Router();

// -- Rotas de usuário -- //
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria um novo usuário no sistema com as informações fornecidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do usuário (gerado pelo sistema ou fornecido)
 *               name:
 *                 type: string
 *                 description: Nome completo do usuário
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário (mínimo de 6 caracteres)
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do usuário
 *                 name:
 *                   type: string
 *                   description: Nome do usuário
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário
 *       400:
 *         description: Erro de validação (nome e e-mail são obrigatórios ou e-mail já cadastrado)
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/register", new RegisterUserController().handle);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: Autentica o usuário com o e-mail e senha fornecidos e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna as informações do usuário e o token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do usuário
 *                 name:
 *                   type: string
 *                   description: Nome do usuário
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado para autenticação futura
 *       400:
 *         description: E-mail ou senha incorretos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/login", new AuthUserController().handle);


/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Obtém o perfil do usuário autenticado
 *     description: Retorna as informações do perfil do usuário autenticado com base no token JWT.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do usuário
 *                 name:
 *                   type: string
 *                   description: Nome do usuário
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário
 *       401:
 *         description: Usuário não autenticado, token inválido ou ausente
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/profile", isAtutenticated, new GetUserController().handle);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtém a lista de todos os usuários
 *     description: Retorna todos os usuários cadastrados no sistema. Requer autenticação.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do usuário
 *                   name:
 *                     type: string
 *                     description: Nome do usuário
 *                   email:
 *                     type: string
 *                     description: E-mail do usuário
 *       401:
 *         description: Usuário não autenticado, token inválido ou ausente
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/users", isAtutenticated, new GetUsersController().handle);


// -- Rotas de Tasks -- //
/**
 * @swagger
 * /register-task:
 *   post:
 *     summary: Registra uma nova tarefa
 *     description: Cria uma nova tarefa no sistema, associando-a a um usuário e categoria. Requer autenticação.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID da tarefa
 *               title:
 *                 type: string
 *                 description: Título da tarefa
 *               description:
 *                 type: string
 *                 description: Descrição detalhada da tarefa
 *               status:
 *                 type: string
 *                 description: Status da tarefa (ex: "pendente", "em andamento", "concluída")
 *               priority:
 *                 type: string
 *                 description: Prioridade da tarefa (ex: "baixa", "média", "alta")
 *               category_id:
 *                 type: string
 *                 description: ID da categoria da tarefa
 *     responses:
 *       200:
 *         description: Tarefa registrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID da tarefa
 *                 title:
 *                   type: string
 *                   description: Título da tarefa
 *                 description:
 *                   type: string
 *                   description: Descrição da tarefa
 *                 status:
 *                   type: string
 *                   description: Status da tarefa
 *                 priority:
 *                   type: string
 *                   description: Prioridade da tarefa
 *                 category_id:
 *                   type: string
 *                   description: ID da categoria da tarefa
 *       400:
 *         description: Campos obrigatórios não preenchidos ou dados inválidos
 *       401:
 *         description: Usuário não autenticado, token inválido ou ausente
 *       404:
 *         description: Usuário ou categoria não encontrados
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/register-task", isAtutenticated, new RegisterTaskController().handle);


/**
 * @swagger
 * /delete-task:
 *   delete:
 *     summary: Exclui uma tarefa
 *     description: Exclui uma tarefa do sistema com base no ID fornecido. Requer autenticação.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID da tarefa a ser excluída
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID da tarefa excluída
 *       400:
 *         description: ID da tarefa não fornecido ou inválido
 *       401:
 *         description: Usuário não autenticado, token inválido ou ausente
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/delete-task", isAtutenticated, new DeleteTaskController().handle);

/**
 * @swagger
 * /list-tasks:
 *   get:
 *     summary: Lista todas as tarefas
 *     description: Retorna todas as tarefas registradas no sistema, incluindo categorias e comentários associados. Requer autenticação.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID da tarefa
 *                   title:
 *                     type: string
 *                     description: Título da tarefa
 *                   description:
 *                     type: string
 *                     description: Descrição da tarefa
 *                   status:
 *                     type: string
 *                     description: Status da tarefa (exemplo: "pendente", "em andamento", "concluída")
 *                   priority:
 *                     type: string
 *                     description: Prioridade da tarefa (exemplo: "baixa", "média", "alta")
 *                   category:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Nome da categoria da tarefa
 *                   Comments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID do comentário
 *                         content:
 *                           type: string
 *                           description: Conteúdo do comentário
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: Data de criação do comentário
 *                         user:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               description: Nome do usuário que fez o comentário
 *       401:
 *         description: Usuário não autenticado, token inválido ou ausente
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/list-tasks", isAtutenticated, new ListTasksController().handle);

/**
 * @swagger
 * /list-task/{id}:
 *   get:
 *     summary: Retorna uma tarefa específica
 *     description: Esta rota retorna os detalhes de uma tarefa com base no ID fornecido, incluindo título, descrição, status, prioridade, categoria e comentários.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa que será buscada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID da tarefa
 *                 title:
 *                   type: string
 *                   description: Título da tarefa
 *                 description:
 *                   type: string
 *                   description: Descrição da tarefa
 *                 status:
 *                   type: string
 *                   description: Status da tarefa (exemplo: "pendente", "em andamento", "concluída")
 *                 priority:
 *                   type: string
 *                   description: Prioridade da tarefa (exemplo: "baixa", "média", "alta")
 *                 category:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nome da categoria associada à tarefa
 *                 Comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       content:
 *                         type: string
 *                         description: Conteúdo do comentário
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Data de criação do comentário
 *                       user:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: Nome do usuário que fez o comentário
 *       400:
 *         description: ID da tarefa inválido ou ausente
 *       404:
 *         description: Tarefa não encontrada
 *       401:
 *         description: Usuário não autenticado, token inválido ou ausente
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/list-task/:id", isAtutenticated, new ListTaskController().handle);

/**
 * @swagger
 * /update-task:
 *   put:
 *     summary: Atualiza os dados de uma tarefa
 *     description: Esta rota permite atualizar os detalhes de uma tarefa existente, como título, descrição, status, prioridade e data de atualização.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID da tarefa que será atualizada
 *               status:
 *                 type: string
 *                 description: Novo status da tarefa (exemplo: "pendente", "em andamento", "concluída")
 *               priority:
 *                 type: string
 *                 description: Nova prioridade da tarefa (exemplo: "baixa", "média", "alta")
 *               title:
 *                 type: string
 *                 description: Novo título da tarefa
 *               description:
 *                 type: string
 *                 description: Nova descrição da tarefa
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID da tarefa
 *                 title:
 *                   type: string
 *                   description: Título da tarefa
 *                 description:
 *                   type: string
 *                   description: Descrição da tarefa
 *                 status:
 *                   type: string
 *                   description: Status da tarefa
 *                 priority:
 *                   type: string
 *                   description: Prioridade da tarefa
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Data e hora da última atualização da tarefa
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *       404:
 *         description: Tarefa não encontrada
 *       401:
 *         description: Usuário não autenticado, token inválido ou ausente
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/update-task", isAtutenticated, new UpdateTaskController().handle);


// -- Rotas de Categories -- //
/**
 * @swagger
 * /register-category:
 *   post:
 *     summary: Registra uma nova categoria
 *     description: Esta rota permite cadastrar uma nova categoria fornecendo um nome e associando-a ao usuário logado.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID único da categoria
 *               name:
 *                 type: string
 *                 description: Nome da nova categoria
 *     responses:
 *       200:
 *         description: Categoria registrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID da categoria
 *                 name:
 *                   type: string
 *                   description: Nome da categoria
 *                 user_id:
 *                   type: string
 *                   description: ID do usuário responsável pela categoria
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *       401:
 *         description: Usuário não autenticado, token inválido ou ausente
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/register-category", isAtutenticated, new RegisterCategoryController().handle);

/**
 * @swagger
 * /list-categories:
 *   get:
 *     summary: Listar todas as categorias
 *     description: Esta rota permite listar todas as categorias cadastradas no sistema.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID da categoria
 *                   name:
 *                     type: string
 *                     description: Nome da categoria
 *                   user_id:
 *                     type: string
 *                     description: ID do usuário responsável pela categoria
 *       401:
 *         description: Usuário não autenticado, token inválido ou ausente
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/list-categories", isAtutenticated, new ListCategoriesController().handle);

// -- Rotas de Comentários -- //
/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Criar um novo comentário
 *     description: Esta rota permite criar um comentário em uma tarefa específica.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - content
 *               - task_id
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do comentário
 *               content:
 *                 type: string
 *                 description: Conteúdo do comentário
 *               task_id:
 *                 type: string
 *                 description: ID da tarefa relacionada ao comentário
 *     responses:
 *       200:
 *         description: Comentário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do comentário
 *                 content:
 *                   type: string
 *                   description: Conteúdo do comentário
 *                 task_id:
 *                   type: string
 *                   description: ID da tarefa relacionada
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nome do usuário que fez o comentário
 *                     email:
 *                       type: string
 *                       description: Email do usuário que fez o comentário
 *       400:
 *         description: Dados inválidos ou falta de parâmetros necessários
 *       401:
 *         description: Usuário não autenticado, token inválido ou ausente
 *       404:
 *         description: Tarefa ou usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/comment", isAtutenticated, new CreateCommentController().handle);

/**
 * @swagger
 * /comments/{task_id}:
 *   get:
 *     summary: Listar comentários de uma tarefa
 *     description: Esta rota permite listar todos os comentários associados a uma tarefa específica.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: task_id
 *         in: path
 *         required: true
 *         description: ID da tarefa para listar os comentários
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentários da tarefa retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do comentário
 *                   content:
 *                     type: string
 *                     description: Conteúdo do comentário
 *                   task_id:
 *                     type: string
 *                     description: ID da tarefa associada ao comentário
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Nome do usuário que fez o comentário
 *                       email:
 *                         type: string
 *                         description: Email do usuário que fez o comentário
 *                   task:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: Título da tarefa
 *                       description:
 *                         type: string
 *                         description: Descrição da tarefa
 *                       status:
 *                         type: string
 *                         description: Status da tarefa
 *                       priority:
 *                         type: string
 *                         description: Prioridade da tarefa
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Data de criação da tarefa
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: Data de atualização da tarefa
 *       400:
 *         description: Parâmetros inválidos ou ausentes
 *       401:
 *         description: Usuário não autenticado, token inválido ou ausente
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/comments/:task_id", isAtutenticated, new ListCommentsByTaskController().handle);

export { router };
