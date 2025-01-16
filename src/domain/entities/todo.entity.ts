


export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date | null,
    ) { }

    get isCompleted() {
        return !!this.completedAt;
    }

    public static parseObject(object: { [key: string]: any }): TodoEntity {
        const { id, text, completedAt } = object;

        if (!id) throw new Error('id parameter is required');
        if (isNaN(Number(id))) throw new Error('id parameter must be a number');

        if (!text) throw new Error('text is required');
        
        let newCompletedAt = completedAt;

        if( completedAt ){
            newCompletedAt = new Date(completedAt);

            if( isNaN( newCompletedAt.getTime() ) ) throw new Error('completedAt must be a DataTime');
        }

        return new TodoEntity(id, text, newCompletedAt);
    }
}