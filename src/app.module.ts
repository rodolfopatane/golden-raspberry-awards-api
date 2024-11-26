import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/movie';
import { DatabaseService } from './shared/database.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: true,
      entities: [Movie],
    }),
    MoviesModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
