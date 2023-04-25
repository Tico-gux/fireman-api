import { FireExtinguisher } from './fire_extinguisher/fire_extinguisher.entity'
import { FireExtinguisherModule } from './fire_extinguisher/fire_extinguisher.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DataSource } from 'typeorm'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { OrderModule } from './orders/orders.module'
import { Order } from './orders/orders.entity'
import { Type } from './fire_extinguisher/type.entity'
import { Weight } from './fire_extinguisher/weight.entity'
require('dotenv').config()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.RDS_HOSTNAME,
            port: parseInt(process.env.RDS_PORT),
            username: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DB_NAME,
            entities: [Order, FireExtinguisher, Type, Weight],
            synchronize: true,
            // autoLoadEntities: [Order, FireExtinguisher, Type, Weight],
            logging: true
        }),
        UsersModule,
        OrderModule,
        FireExtinguisherModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
