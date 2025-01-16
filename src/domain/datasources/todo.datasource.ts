import { CreateTodoDTO, UpdateTodoDTO } from "../dto";
import { TodoEntity } from "../entities/todo.entity";



export abstract class TodoDatasource {

    abstract create( createTodoDTO: CreateTodoDTO ): Promise<TodoEntity>;
    abstract getAll(): Promise<TodoEntity[]>; //TODO: Agregar en argumentos la paginación
    abstract getById( id: number ): Promise<TodoEntity | null>
    abstract deleteById( id: number ): Promise<TodoEntity | null>
    abstract updateById( updateTodoDTO : UpdateTodoDTO ): Promise<TodoEntity | null> 
}