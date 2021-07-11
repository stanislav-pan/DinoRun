import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetUserFromHeaderMiddleware } from './core/middlewares/get-user-from-header.middleware';
import { CommentsModule } from './modules/comments/comments.module';
import { ReactionsModule } from './modules/reactions/reactions.module';
import { ThemesModule } from './modules/themes/themes.module';
import { TopicsModule } from './modules/topics/topics.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    MorganModule,
    ConfigModule.forRoot({
      envFilePath: '../../.env.dev',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: (() => {
        console.log('process.env.POSTGRES_HOST', process.env.POSTGRES_HOST);

        return process.env.POSTGRES_HOST;
      })(),
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    TopicsModule,
    CommentsModule,
    ReactionsModule,
    ThemesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUserFromHeaderMiddleware).exclude('docs').forRoutes('*');
  }
}
