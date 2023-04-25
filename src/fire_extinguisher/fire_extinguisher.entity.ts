import {
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToOne,
    UpdateDateColumn
} from 'typeorm'
import { Column } from 'typeorm/decorator/columns/Column'
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn'
import { Type } from './type.entity'

@Entity()
export class FireExtinguisher {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Type)
    type: Type

    @Column()
    quantity: number

    @DeleteDateColumn()
    deletedAt?: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt?: Date
}
