import { Router } from "express";
import { TodoController } from "./controller";

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const controller = new TodoController();
        
        // routes.use('/', (req, res) => controller.get(req, res) );
        router.get('/', controller.get );
        router.get('/:id', controller.getTodoById );

        router.post('/', controller.createTodo );
        router.put('/:id', controller.updateTodo );
        router.delete('/:id', controller.deleteTodo);
        

        return router;
    }
}