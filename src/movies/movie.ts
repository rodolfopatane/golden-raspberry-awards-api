import { IsBoolean, IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { AppParams } from '../shared/app-params';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';


@Entity()
@Index(['winner', 'year', 'producers'])
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  @Min(AppParams.MIN_VALID_YEAR)
  @Max(AppParams.MAX_VALID_YEAR)
  year: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  studios: string;

  @Column()
  @IsString()
  producers: string;

  @Column({ default: false })
  @IsBoolean()
  winner: boolean;
}
