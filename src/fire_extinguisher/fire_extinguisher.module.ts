import { TypeOrmModule } from '@nestjs/typeorm'
import { FireExtinguisher } from './fire_extinguisher.entity'
import { Module } from '@nestjs/common'
import { FireExtinguisherService } from './fire_extinguisher.service'
import { FireExtinguisherController } from './fire_extinguisher.controller'

@Module({
    imports: [TypeOrmModule.forFeature([FireExtinguisher])],
    providers: [FireExtinguisherService],
    controllers: [FireExtinguisherController],
    exports: [FireExtinguisherService]
})
export class FireExtinguisherModule {}
