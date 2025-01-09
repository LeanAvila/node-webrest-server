import { Request, Response, Router } from "express";

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() , isDelete : false},
    { id: 2, text: 'Buy bread', createdAt: null , isDelete : false},
    { id: 3, text: 'Buy butter', createdAt: new Date() , isDelete : false},
];

export class TodoController {

    constructor() { }

    public get = (req: Request, res: Response) => {
        res.json( todos.filter( todo => (todo.isDelete === false)));
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id  //CON EL MÁS REALIZAMOS LA CONVERSIÓN IMPLÍCITAMENTE

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Argument is not a number' });
            return;
        }

        const result = todos.find(todo => (todo.id === id && todo.isDelete === false));

        (result)
            ? res.json(result)
            : res.status(404).json({ error: `Todo with ID ${id} not found` })

    };

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;

        if (!text) {
            res.status(400).json({ error: 'text propiety is required' });
            return;
        }

        const newTodo = {
            id: todos.length + 1,
            text: text,
            createdAt: null,
            isDelete: false,
        };

        todos.push(newTodo);

        res.json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id  //SE ESPECIFÍCA EN EL URL

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Argument is not a number' });
            return;
        }

        const { text, createdAt } = req.body; //SE RECIBE EN EL BODY LAS PROPIEDADES QUE SE ACTUALIZAN

        // if ( !text ) {
        //     res.status(400).json({ error : 'text propiety is required'});
        //     return;
        // }

        const result = todos.find(todo => (todo.id === id && todo.isDelete === false));

        if (!result) {
            res.status(404).json({ error: `Todo with ID ${id} not found` });
            return;
        }

        //! OJO, esto es por referencia (es otra variable pero hace referencia al mismo obj "todos")
        result.text = text || result.text;

        (createdAt === 'null')
            ? result.createdAt = createdAt
            : result.createdAt = new Date(createdAt || result.createdAt);

        //LA MANERA APROPIADA DE HACERLO (sin referencias):
        // const todoResult = todos.forEach( (todo, index) => {
        //     if (todo.id === id){
        //         todos[index] = todo
        //     }
        // })
        res.json(result);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id  //SE ESPECIFÍCA EN EL URL

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Argument is not a number' });
            return;
        }

        const result = todos.find(todo => (todo.id === id && todo.isDelete === false));

        if (!result) {
            res.status(404).json({ error: `Todo with ID ${id} not found` });
            return;
        }

        result.isDelete = true;

        res.json(result);
    }
}