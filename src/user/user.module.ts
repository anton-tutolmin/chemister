import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./user.controller";
import { Users } from "./user.entity";
import { UsersService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}