import { PrismaService } from "../../config/orm.plugin";
import { CreateTodoDTO, TodoDatasource, TodoEntity, UpdateTodoDTO } from "../../domain";


export class TodoDatasourceImpl implements TodoDatasource {

    constructor(
        private readonly prisma: PrismaService,
    ){}

    async create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        const todo = await this.prisma.todo.create({
            data : createTodoDTO,
        });

        return TodoEntity.parseObject( todo );
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await this.prisma.todo.findMany({
            where: {
                isDeleted: false,
            }
        });
        return todos.map( TodoEntity.parseObject );
    }

    async getById(id: number): Promise<TodoEntity | null> {
        const todo = await this.prisma.todo.findFirst({
            where: {
                id: id,
                isDeleted: false,
            }
        });

        if ( !todo ) throw `todo with id ${id} not found`;

        return TodoEntity.parseObject( todo );
    }

    async deleteById(id: number): Promise<TodoEntity | null> {

        await this.getById( id );

        const todoDeleted = await this.prisma.todo.update({
            where: {
                id : id,
            },
            data: {
                isDeleted: true,
            }
        });

        if ( !todoDeleted ) throw 'the todo could not be deleted';

        return TodoEntity.parseObject( todoDeleted );
    }

    async updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity | null> {

        await this.getById( updateTodoDTO.id );

        const todoUpdated = await this.prisma.todo.update({
            where : {
                id: updateTodoDTO.id,
            },
            data : updateTodoDTO!.values,
        });

        return TodoEntity.parseObject( todoUpdated );
    }
    
    
}