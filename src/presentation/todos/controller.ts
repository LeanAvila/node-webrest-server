import { Request, Response, Router } from "express";
import { prisma } from "../../data/postgres/init";

// const todos = [
//     { id: 1, text: 'Buy milk', completedAt: new Date() , isDelete : false},
//     { id: 2, text: 'Buy bread', completedAt: null , isDelete : false},
//     { id: 3, text: 'Buy butter', completedAt: new Date() , isDelete : false},
// ];

export class TodoController {

    constructor() { }

    public get = (req: Request, res: Response) => {

        const todos = prisma.todo.findMany({
            where: {
                isDeleted: false,
            }
        });

        res.json( todos );
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id  //CON EL MÁS REALIZAMOS LA CONVERSIÓN IMPLÍCITAMENTE

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Argument is not a number' });
            return;
        }

        const todo = prisma.todo.findFirst({
            where: {
                id: id,
            }
        });
        // const result = todos.find(todo => (todo.id === id && todo.isDelete === false));

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with ID ${id} not found` })

    };

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;

        if (!text) {
            res.status(400).json({ error: 'text propiety is required' });
            return;
        }

        const todo = prisma.todo.create({
            data : {
                text: text,
                completedAt: null,
                isDeleted: false,
            }
        });

        res.json(todo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id  //SE ESPECIFÍCA EN EL URL

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Argument is not a number' });
            return;
        }

        const { text, completedAt } = req.body; //SE RECIBE EN EL BODY LAS PROPIEDADES QUE SE ACTUALIZAN

        // if ( !text ) {
        //     res.status(400).json({ error : 'text propiety is required'});
        //     return;
        // }

        const foundTodo = prisma.todo.update({
            where : {
                id : id,
            },
            data : {
                text,
                completedAt
            }
        });
        // const result = todos.find(todo => (todo.id === id && todo.isDelete === false));

        if (!foundTodo) {
            res.status(404).json({ error: `Todo with ID ${id} not found` });
            return;
        }

        //! OJO, esto es por referencia (es otra variable pero hace referencia al mismo obj "todos")
        // result.text = text || result.text;

        // (completedAt === 'null')
        //     ? result.completedAt = completedAt
        //     : result.completedAt = new Date(completedAt || result.completedAt);

        //LA MANERA APROPIADA DE HACERLO (sin referencias):
        // const todoResult = todos.forEach( (todo, index) => {
        //     if (todo.id === id){
        //         todos[index] = todo
        //     }
        // })
        res.json(foundTodo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id  //SE ESPECIFÍCA EN EL URL

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Argument is not a number' });
            return;
        }

        const todoDeleted = prisma.todo.update({
            where: {
                id : id,
            },
            data: {
                isDeleted: true,
            }
        });

        // const result = todos.find(todo => (todo.id === id && todo.isDelete === false));

        if (!todoDeleted) {
            res.status(404).json({ error: `Todo with ID ${id} not found` });
            return;
        }

        // result.isDelete = true;

        res.json(todoDeleted);
    }
}