import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ListModule } from './list/list.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ListModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
