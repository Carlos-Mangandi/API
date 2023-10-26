//import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Rol{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    type: string

    @Column({default:true }) // para que cuando un nuevo registro se crea el valor que tendrá sera ACTIVE por eliminación lógica
    state: boolean  //0,1  el estado siempre será de tipo booleano 0 = es como inactivo 1 = es como activo
}