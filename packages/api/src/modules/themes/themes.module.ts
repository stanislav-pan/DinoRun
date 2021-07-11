import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserTheme } from './models/user-theme.model';
import { SiteTheme } from './models/site-theme.model';

@Module({
  imports: [SequelizeModule.forFeature([UserTheme, SiteTheme])],
  controllers: [ThemesController],
  providers: [ThemesService],
  exports: [ThemesService],
})
export class ThemesModule {}
