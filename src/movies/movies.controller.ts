import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(private readonly service: MoviesService) {}

  @Get('awards/winners/intervals')
  @ApiOperation({
    summary: 'Vencedores da categoria "Pior Filme" do Golden Raspberry',
    description:
      'Produtores com o maior e menor intervalo entre prémios consecutivos',
  })
  async findAwardIntervals() {
    return this.service.findAwardIntervals();
  }
}
