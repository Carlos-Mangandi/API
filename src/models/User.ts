import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId } from "typeorm";
import { Rol } from "./Rol";

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number

    @RelationId((user: User) => user.rol) //esta anotación se utiliza para obtener el valor del id del rol relacionado
    rolId: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ default: true })
    state: boolean
    
    @ManyToOne(() => Rol) //  Significa que un usuario puede estar asociado a un solo rol.
    rol: Rol
}