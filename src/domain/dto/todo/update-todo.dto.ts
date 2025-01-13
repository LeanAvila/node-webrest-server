export class UpdateTodoDTO {

    private constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly completedAt?: Date | null,
        public readonly isDeleted: boolean = false,
    ){}

    get values(){
        const returnObj: {[key: string] : any} = {};

        if( this.id ) returnObj.id = this.id;
        if( this.text ) returnObj.text = this.text;
        if( this.completedAt || this.completedAt === null ) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {

        const { id, text, completedAt } = props;


        let newCompletedAt: Date | null | undefined = undefined;
        
        if ( !id && !isNaN(Number(id))) return ['id argument must be a number'];

        if ( completedAt ) {

            if( completedAt === 'null') {
                newCompletedAt = null;
                
            } else if ( new Date(completedAt).toString() === 'Invalid Date'){
                return ['completedAt argument must be a DateTime'];

            } else {
                newCompletedAt =  new Date(completedAt);
            }
            
        }

        return [undefined, new UpdateTodoDTO( id, text, newCompletedAt )];
    }
}