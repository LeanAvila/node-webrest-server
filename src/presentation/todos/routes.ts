import { Router } from "express";
import { TodoController } from "./controller";
import { TodoDatasourceImpl } from "../../infraestructure/datasources/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl";
import { PrismaService } from "../../config/orm.plugin";

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

        const prismaService = new PrismaService();
        const datasource = new TodoDatasourceImpl( prismaService );
        const repository = new TodoRepositoryImpl( datasource );
        const controller = new TodoController( repository);
        
        // routes.use('/', (req, res) => controller.get(req, res) );
        router.get('/', controller.getAll );
        router.get('/:id', controller.getTodoById );

        router.post('/', controller.createTodo );
        router.put('/:id', controller.updateTodo );
        router.delete('/:id', controller.deleteTodo);
        

        return router;
    }
}