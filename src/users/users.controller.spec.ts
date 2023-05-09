import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import * as request from 'supertest';
import * as faker from 'faker';

let app: INestApplication;

const userData = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'Rk%1Xe7#6Fh8',
};

describe('/api/auth', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST /auth/signup', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .set('Content-type', 'application/json')
      .send(userData);

    expect(response.status).toBe(201);
  });

  describe('POST /auth/signin', () => {
    const data = {
      username: userData.username,
      password: userData.password,
    };

    it('should return an access token when credentials are correct', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send(data)
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
    });

    it('should return a 401 Unauthorized error when credentials are incorrect', async () => {
      data.password = 'incorrect_password';
      await request(app.getHttpServer())
        .post('/auth/signin')
        .send(data)
        .expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
