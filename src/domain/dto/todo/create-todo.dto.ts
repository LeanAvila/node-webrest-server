/**
 * ? DTO (DATA TRANSFER OBJECT) es decir, objeto de transferencia de datos
 */

/**
 * ? Funcionalidad del Constructor Privado
 * Obliga a los usuarios a usar un método estático (por ejemplo, create) 
 * que puede contener lógica de validación o configuración adicional 
 * antes de crear la instancia.
 */


export class CreateTodoDTO {

    text: string;
    completedAt: Date | null;
    isDeleted: boolean;

    private constructor( text: string, completedAt: Date | null ) { //CONSTRUCTOR PRIVADO, SOLO PUEDE SER INSTANCIADO DENTRO DE LA CLASE
        this.text = text;
        this.completedAt = completedAt;
        this.isDeleted = false;
    }

    static create(props: { [key: string]: any }): [string?, CreateTodoDTO?] {

        const { text, completedAt = null } = props;

        if (!text) return ['Text propiety is required', undefined]
        if ( completedAt ) {
            if ( isNaN(Date.parse(completedAt)) ){ //Date.parse devuelva NaN si no es fecha válida
                return ['completedAt argument must be a DateTime', undefined];
            } else {
                return [undefined, new CreateTodoDTO( text, new Date(completedAt) )];
            }
        }

        return [undefined, new CreateTodoDTO( text, null )];
    }
}