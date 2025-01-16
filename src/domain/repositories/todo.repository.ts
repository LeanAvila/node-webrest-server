import { CreateTodoDTO, UpdateTodoDTO } from "../dto";
import { TodoEntity } from "../entities/todo.entity";



export interface TodoRepository {

    create( createTodoDTO: CreateTodoDTO ): Promise<TodoEntity>;
    getAll(): Promise<TodoEntity[]>; //TODO: Agregar en argumentos la paginación
    getById( id: number ): Promise<TodoEntity | null>
    deleteById( id: number ): Promise<TodoEntity | null>
    updateById( updateTodoDTO : UpdateTodoDTO ): Promise<TodoEntity | null> 
}