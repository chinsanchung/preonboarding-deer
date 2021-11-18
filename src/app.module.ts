import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.DB,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      port: 3306,
      password: process.env.DB_PASS,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
      legacySpatialSupport: false,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
