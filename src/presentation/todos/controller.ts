import { Request, Response, Router } from "express";
import { prisma } from "../../data/postgres/init";
import { isDate } from "util/types";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dto";
import { TodoRepository } from "../../domain";
import { GetAllTodo } from "../../domain/use-cases/todo/getAll.todo";
import { GetByIdTodo } from "../../domain/use-cases/todo/getById.todo";
import { CreateTodo } from "../../domain/use-cases/todo/create.todo";
import { UpdateTodo } from "../../domain/use-cases/todo/update.todo";
import { DeleteTodo } from "../../domain/use-cases/todo/delete.todo";

// const todos = [
//     { id: 1, text: 'Buy milk', completedAt: new Date() , isDelete : false},
//     { id: 2, text: 'Buy bread', completedAt: null , isDelete : false},
//     { id: 3, text: 'Buy butter', completedAt: new Date() , isDelete : false},
// ];

export class TodoController {

    constructor(
        private readonly repository: TodoRepository,
    ){}

    public getAll = (req: Request, res: Response) => {

        new GetAllTodo( this.repository )
            .execute()
            .then( todos => res.json( todos ))
            .catch( error => res.status(400).json({ error }))
    }

    public getTodoById = (req: Request, res: Response) => {

        if (isNaN( Number(req.params.id) )) {
            res.status(400).json({ error: 'ID Argument is not a number' });
            return;
        }

        const id = Number.parseInt( req.params.id );

        new GetByIdTodo( this.repository )
            .execute(id)
            .then( todo => res.json( todo ))
            .catch( error => res.status(400).json({ error: `${error}` }))

        // try {
        //     const todo = await this.repository.getById( id );
        //     res.json(todo);
        //     return;

        // } catch (error) {
        //     const errorMessage = `${error}`;
        //     res.status(404).json( {error: errorMessage } );
        //     return;
        // }

    };

    public createTodo = (req: Request, res: Response) => {

        const [error, createTodo ] = CreateTodoDTO.create( req.body );

        if( error ){
            res.status(400).json({ error });
            return;
        }
        
        new CreateTodo( this.repository )
            .execute( createTodo! )
            .then( todoCreated => res.json( todoCreated ))
            .catch( error => res.status(400).json({ error }))
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id  //SE ESPECIFÍCA EN EL URL
        
        const [error, updateTodoDTO] = UpdateTodoDTO.create({
            ...req.body,
            id,
        });

        if ( error ) {
            res.status(400).json({ error });
            return;
        }

        new UpdateTodo( this.repository )
            .execute( updateTodoDTO! )
            .then( todoUpdated => res.json( todoUpdated ))
            .catch( error => res.status(400).json({error}))
        
        // try {
        //     const todoUpdated = await this.repository.updateById( updateTodoDTO! );
        //     res.json( todoUpdated );
        //     return;

        // } catch (error) {
        //     const errorMessage = `${error}`;
        //     res.status(404).json( {error: errorMessage } );
        //     return;
        // }

        // const { text, completedAt } = req.body; //SE RECIBE EN EL BODY LAS PROPIEDADES QUE SE ACTUALIZAN

        //! OJO, esto es por referencia (es otra variable pero hace referencia al mismo obj "todos")
        // result.text = text || result.text;
        
        
        // if( completedAt ){ 

        //     if ( completedAt === 'null'){
        //         foundTodo.completedAt = null;

        //     } else if ( isNaN(Date.parse(completedAt)) ){ //Date.parse devuelva NaN si no es fecha válida
        //         res.status(400).json({ error: `completedAt argument must be a DateTime` });
        //         return;

        //     } else {
        //         foundTodo.completedAt = new Date(completedAt);
        //     }

        // }

    }

    public deleteTodo = (req: Request, res: Response) => {

        if (isNaN( Number(req.params.id) )) {
            res.status(400).json({ error: 'ID Argument is not a number' });
            return;
        }

        const id = Number.parseInt( req.params.id );

        new DeleteTodo( this.repository )
            .execute( id )
            .then( todoDeleted => res.json( todoDeleted ) )
            .catch( error => res.status(400).json({ error }))

    }
}