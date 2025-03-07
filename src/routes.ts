import { Router } from "express";

import { isAtutenticated } from "./middlewares/isAtutenticated";

import { RegisterUserController } from "./Controllers/Users/RegisterUserController";
import { AuthUserController } from "./Controllers/Users/AuthUserController";
import { GetUserController } from "./Controllers/Users/GetUserController";
import { GetUsersController } from "./Controllers/Users/GetUsersController";

import { RegisterTaskController } from "./Controllers/Tasks/RegisterTaskController";
import { ListTasksController } from "./Controllers/Tasks/ListTasksController";
import { UpdateTaskController } from "./Controllers/Tasks/UpdateTaskController";

import { RegisterCategoryController } from "./Controllers/Categories/RegisterCategoryController";
import { ListCategoriesController } from "./Controllers/Categories/ListCategoriesController";

import { CreateCommentController } from "./Controllers/Comments/CreateCommentController";
import { ListCommentsByTaskController } from "./Controllers/Comments/ListCommentsByTaskController";


const router = Router();

// -- Rotas de usuário -- //
router.post("/register", new RegisterUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/profile", isAtutenticated, new GetUserController().handle);
router.get("/users", isAtutenticated, new GetUsersController().handle);

// -- Rotas de Tasks -- //
router.post("/register-task", isAtutenticated, new RegisterTaskController().handle);
router.get("/list-tasks", isAtutenticated, new ListTasksController().handle);
router.put("/update-task", isAtutenticated, new UpdateTaskController().handle);

// -- Rotas de Categories -- //
router.post("/register-category", isAtutenticated, new RegisterCategoryController().handle);
router.get("/list-categories", isAtutenticated, new ListCategoriesController().handle);

// -- Rotas de Comentários -- //
router.post("/comment", isAtutenticated, new CreateCommentController().handle);
router.get("/comments", isAtutenticated, new ListCommentsByTaskController().handle);

export { router };
