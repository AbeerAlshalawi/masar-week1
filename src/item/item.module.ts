import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])], // Register Item entity with TypeOrmModule
  providers: [ItemService],
  controllers: [ItemController],
  exports: [ItemService], // Optional: export if used in other modules
})
export class ItemModule {}
