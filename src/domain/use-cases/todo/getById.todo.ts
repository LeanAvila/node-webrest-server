import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetByIdUseCase {
    execute(id: number): Promise<TodoEntity | null>;
}

export class GetByIdTodo implements GetByIdUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ) { }

    async execute(id: number): Promise<TodoEntity | null>  {
        return await this.repository.getById( id );
    }

}