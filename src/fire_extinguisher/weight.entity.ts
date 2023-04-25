import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity()
export class Weight {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    kg: string

    @DeleteDateColumn()
    deletedAt?: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt?: Date
}
