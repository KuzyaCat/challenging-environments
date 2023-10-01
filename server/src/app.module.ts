import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';

import { DatabaseModule } from './database/database.module';
import { EnvironmentModule } from './environment/environment.module';
import { CountryModule } from './country/country.module';
import { RegionModule } from './region/region.module';
import { TeamModule } from './team/team.module';
import { IndicatorTypeModule } from './indicator-type/indicator-type.module';
import { TeamIndicatorModule } from './team-indicator/team-indicator.module';
import { PlayerIndicatorModule } from './player-indicator/player-indicator.module';
import { PlayerModule } from './player/player.module';
import { TournamentModule } from './tournament/tournament.module';
import { MatchModule } from './match/match.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    //ServeStaticModule.forRoot({ // TODO: fix error
      //rootPath: path.resolve(__dirname, 'static'),
    //}),
    DatabaseModule,
    EnvironmentModule,
    CountryModule,
    RegionModule,
    TeamModule,
    IndicatorTypeModule,
    TeamIndicatorModule,
    PlayerIndicatorModule,
    PlayerModule,
    TournamentModule,
    MatchModule,
  ],
})
export class AppModule {}
