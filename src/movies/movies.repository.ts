import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
  ) {}

  async findMovies(): Promise<Movie[]> {
    return await this.repository.find({ where: { winner: true } });
  }

  async save(movies: Partial<Movie>[]) {
    await this.repository.insert(movies);
  }
}
