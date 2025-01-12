import { Request, Response, Router } from "express";
import { prisma } from "../../data/postgres/init";
import { isDate } from "util/types";

// const todos = [
//     { id: 1, text: 'Buy milk', completedAt: new Date() , isDelete : false},
//     { id: 2, text: 'Buy bread', completedAt: null , isDelete : false},
//     { id: 3, text: 'Buy butter', completedAt: new Date() , isDelete : false},
// ];

export class TodoController {

    constructor() { }

    public get = async (req: Request, res: Response) => {

        const todos = await prisma.todo.findMany({
            where: {
                isDeleted: false,
            }
        });

        res.json( todos );
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id  //CON EL MÁS REALIZAMOS LA CONVERSIÓN IMPLÍCITAMENTE

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Argument is not a number' });
            return;
        }

        const todo = await prisma.todo.findFirst({
            where: {
                id: id,
                isDeleted: false,
            }
        });
        // const result = todos.find(todo => (todo.id === id && todo.isDelete === false));

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with ID ${id} not found` })

    };

    public createTodo = async (req: Request, res: Response) => {
        const { text } = req.body;

        if (!text) {
            res.status(400).json({ error: 'text propiety is required' });
            return;
        }

        const todo = await prisma.todo.create({
            data : {
                text: text,
                completedAt: null,
                isDeleted: false,
            }
        });

        res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id  //SE ESPECIFÍCA EN EL URL

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Argument is not a number' });
            return;
        }

        const foundTodo = await prisma.todo.findFirst({
            where: {
                id,
                isDeleted: false,
            }
        });

        if (!foundTodo) {
            res.status(404).json({ error: `Todo with ID ${id} not found` });
            return;
        }

        const { text, completedAt } = req.body; //SE RECIBE EN EL BODY LAS PROPIEDADES QUE SE ACTUALIZAN

        //! OJO, esto es por referencia (es otra variable pero hace referencia al mismo obj "todos")
        // result.text = text || result.text;
        
        
        if( completedAt ){ 

            if ( completedAt === 'null'){
                foundTodo.completedAt = null;

            } else if ( isNaN(Date.parse(completedAt)) ){ //Date.parse devuelva NaN si no es fecha válida
                res.status(400).json({ error: `completedAt argument must be a DateTime` });
                return;

            } else {
                foundTodo.completedAt = new Date(completedAt);
            }

        }


        const todoUpdated = await prisma.todo.update({
            where : {
                id,
            },
            data : {
                ...foundTodo,
                text: text || foundTodo.text, //SI NO HAY TEXTO, ENTONCES SE MANTIENE EL ORIGINAL DE LA DB
            }
        });

        res.json(todoUpdated);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id  //SE ESPECIFÍCA EN EL URL

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID Argument is not a number' });
            return;
        }

        const foundTodo = await prisma.todo.findFirst({
            where: {
                id,
                isDeleted: false,
            }
        });

        if (!foundTodo) {
            res.status(404).json({ error: `Todo with ID ${id} not found` });
            return;
        }

        const todoDeleted = await prisma.todo.update({
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