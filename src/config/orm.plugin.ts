import { PrismaClient } from "@prisma/client";
import { TodoRepository } from "../domain/repositories/todo.repository";
import { TodoDatasource } from "../domain/datasources/todo.datasource";
import { CreateTodoDTO, UpdateTodoDTO } from "../domain/dto";
import { TodoEntity } from "../domain/entities/todo.entity";




export class PrismaService extends PrismaClient {

    constructor(){
        super();
        this.$connect;
    }

    async disconnect(): Promise<void> {
        await this.$disconnect();
    }
    
}