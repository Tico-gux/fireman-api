import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { FireExtinguisher } from './fire_extinguisher.entity'
import { Weight } from './weight.entity'

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => FireExtinguisher, fireExtinguisher => fireExtinguisher.type)
    fireExtinguishers: FireExtinguisher[]

    @ManyToMany(() => Weight)
    weight: Weight

    @DeleteDateColumn()
    deletedAt?: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt?: Date
}
