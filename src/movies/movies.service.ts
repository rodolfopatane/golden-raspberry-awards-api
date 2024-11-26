import { Injectable, Inject, Logger } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { Movie } from './movie';

@Injectable()
export class MoviesService {
  constructor(@Inject() private readonly repository: MoviesRepository) {}

  private readonly logger = new Logger(MoviesService.name);

  public async findAwardIntervals() {
    const movies = await this.repository.findMovies();
    const producerMap = this.getProducers(movies);
    const intervals = this.getIntervals(producerMap);

    const minInterval = Math.min(...intervals.map((i) => i.interval));
    const maxInterval = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === minInterval),
      max: intervals.filter((i) => i.interval === maxInterval),
    };
  }

  private getProducers(winners: Movie[]) {
    const producerMap = new Map<string, number[]>();

    winners.forEach((movie) => {
      const producers = movie.producers.split(/,|and/).map((p) => p.trim()).filter((p) => p);
      producers.forEach((producer) => {
        if (!producerMap.has(producer)) producerMap.set(producer, []);

        producerMap.get(producer).push(movie.year);
      });
    });
    return producerMap;
  }

  private getIntervals(producerMap: Map<string, number[]>) {
    const intervals = [];
    producerMap.forEach((years, producer) => {
      years.sort((a, b) => a - b);
      for (let i = 1; i < years.length; i++) {
        intervals.push({
          producer,
          interval: years[i] - years[i - 1],
          previousWin: years[i - 1],
          followingWin: years[i],
        });
      }
    });
    return intervals;
  }
}
