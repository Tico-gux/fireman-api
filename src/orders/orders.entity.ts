import { CreateDateColumn, DeleteDateColumn, Entity, OneToOne, UpdateDateColumn } from 'typeorm'
import { Column } from 'typeorm/decorator/columns/Column'
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    nro: number

    @Column()
    dni: number

    @Column({ default: '' })
    name: string

    @Column({ default: '' })
    email: string

    @Column({ default: '' })
    status: string

    @Column({ default: 0 })
    price: number

    @Column({ default: 0 })
    phone: number

    @DeleteDateColumn()
    deletedAt?: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt?: Date
}
