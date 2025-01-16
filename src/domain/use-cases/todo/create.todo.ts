import { CreateTodoDTO } from "../../dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCase {
    execute( createTodoDTO: CreateTodoDTO ): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ){}

    async execute(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
         return await this.repository.create( createTodoDTO! );
    }

}