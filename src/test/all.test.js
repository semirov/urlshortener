
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import urlModel from '../models/urlModel';
import { before } from 'mocha';
use(chaiHttp);

describe('testing GET /api/all', () => {

  before(async () => {
    await urlModel.deleteMany({}).exec();
  });

  it('all records returned', async () => {
    await request(server).post('/api/generateShortUrl').send({ url: 'ya.ru', shortUrl: 'test' });
    let res = await request(server).get('/api/all');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.a('array');
    expect(res.body).to.have.length(1);
  });

})