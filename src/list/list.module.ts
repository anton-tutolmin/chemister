import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListsController } from "./list.controller";
import { Lists } from "./list.entity";
import { ListsService } from "./list.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Lists])
  ],
  providers: [ListsService],
  controllers: [ListsController],
  exports: [ListsService],
})
export class ListModule {}