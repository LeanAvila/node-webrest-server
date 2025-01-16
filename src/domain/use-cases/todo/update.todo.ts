import { UpdateTodoDTO } from "../../dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
    execute( updateTodoDTO: UpdateTodoDTO ): Promise<TodoEntity | null>;
}

export class UpdateTodo implements UpdateTodoUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ){}

    async execute(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity | null> {
         return await this.repository.updateById( updateTodoDTO! );
    }

}