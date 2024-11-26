import { AppModule } from '../src/app.module';
import { NestApplication } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('Movies API - Award Intervals (e2e)', () => {
  let app: NestApplication;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return the correct min and max award intervals', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies/awards/winners/intervals')
      .expect(200);

    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');

    const { min, max } = response.body;

    expect(min).toBeInstanceOf(Array);
    expect(max).toBeInstanceOf(Array);

    expect(min[0]?.producer).toEqual('Bo Derek');
    expect(min[0]?.interval).toEqual(6);
    expect(min[0]?.previousWin).toEqual(1984);
    expect(min[0]?.followingWin).toEqual(1990);

    expect(max[0]?.producer).toEqual('Matthew Vaughn');
    expect(max[0]?.interval).toEqual(13);
    expect(max[0]?.previousWin).toEqual(2002);
    expect(max[0]?.followingWin).toEqual(2015);
  });
});
