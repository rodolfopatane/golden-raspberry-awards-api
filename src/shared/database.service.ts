import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { MoviesRepository } from '../movies/movies.repository';
import { Movie } from '../movies/movie';
import { join } from 'path';
import { readFileSync } from 'fs';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AppParams } from '../shared/app-params';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@Inject() private readonly repository: MoviesRepository) {}

  private readonly logger = new Logger(DatabaseService.name);

  public async onModuleInit() {
    this.logger.log('Start CSV Import.');
    var movies = await this.getMoviesFromDatabaseCsv();
    if (!(movies?.length > 0)) {
      this.logger.error('CSV import error.');
      return;
    }

    await this.repository.save(movies);
  }

  public async getMoviesFromDatabaseCsv() {
    const rows = this.getMoviesFromCSV();
    const validMovies = await this.getValidMovies(rows);
    this.logger.log(`${validMovies.length} rows valid to import.`);
    return validMovies;
  }

  private getMoviesFromCSV() {
    const filePath = join(__dirname, AppParams.CSV_RELATIVE_PATH);
    const csvData = readFileSync(filePath, AppParams.CSV_ENCODE);
    return csvData
      .split(AppParams.CSV_SPLIT_ROW_SYMBOL)
      .map(this.loadRowsFromCSV)
      .filter((movie) => movie);
  }

  private loadRowsFromCSV(row: string, index: number) {
    if (AppParams.IGNORE_TITLE && index == 0) return;

    var cols = row.split(AppParams.CSV_SPLIT_COL_SYMBOL);
    var year =
      isNaN(Number(cols[AppParams.YEAR_CSV_POSITION])) ||
      !Number.isInteger(Number(cols[AppParams.YEAR_CSV_POSITION]))
        ? 0
        : Number(cols[AppParams.YEAR_CSV_POSITION]);

    return plainToInstance(Movie, {
      year,
      title: cols[AppParams.TITLE_CSV_POSITION],
      studios: cols[AppParams.STUDIOS_CSV_POSITION],
      producers: cols[AppParams.PRODUCERS_CSV_POSITION],
      winner:
        cols[AppParams.WINNER_CSV_POSITION]?.toLowerCase() == 'yes' ||
        cols[AppParams.WINNER_CSV_POSITION]?.toLowerCase() == 'true',
    });
  }

  private async getValidMovies(rows: Movie[]) {
    if (!(rows?.length > 0)) return;

    const validatedRows = await Promise.all(
      rows.map(async (movie) => ({
        row: movie,
        validationErrors: await validate(movie),
      })),
    );

    const rowsToIgnore = validatedRows
      .map((rowDetails, index) => {
        if (!(rowDetails?.validationErrors?.length > 0)) return;
        this.logger.warn(`${rowDetails.validationErrors}`);
        this.logger.warn(`[${index}] - ${JSON.stringify(rowDetails.row)}`);
        return rowDetails;
      })
      .filter((rowDetails) => rowDetails); // filtro só no final para obter linha da planilha durante o map

    this.logger.warn(`${rowsToIgnore.length} rows ignored`);

    return validatedRows
      .filter((rowDetails) => rowDetails.validationErrors.length == 0)
      .map((rowDetails) => rowDetails.row);
  }
}
