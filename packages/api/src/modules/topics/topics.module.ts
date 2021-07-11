import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Topic } from './models/topic.model';

@Module({
  imports: [SequelizeModule.forFeature([Topic])],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
