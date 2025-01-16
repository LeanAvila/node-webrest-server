import { CreateTodoDTO, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDTO } from "../../domain";


export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDatasource,
    ){}

    async create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        return this.datasource.create( createTodoDTO );
    }
    async getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    async getById(id: number): Promise<TodoEntity | null> {
        return this.datasource.getById( id );
    }
    async deleteById(id: number): Promise<TodoEntity | null> {
        return this.datasource.deleteById( id );
    }
    async updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity | null> {
        return this.datasource.updateById( updateTodoDTO );
    }
}