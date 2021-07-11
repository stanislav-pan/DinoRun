import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { CommentsModule } from '../comments/comments.module';
import { Reaction } from './models/reaction.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReactionUser } from './models/reaction-user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Reaction, ReactionUser]),
    CommentsModule,
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService],
})
export class ReactionsModule {}
