import { CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm'
import { Column } from 'typeorm/decorator/columns/Column'
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    email: string

    @Column()
    password: string

    @DeleteDateColumn()      
    deletedAt?:Date

    @CreateDateColumn()      
    createdAt:Date

    @UpdateDateColumn()      
    updatedAt?:Date


}
