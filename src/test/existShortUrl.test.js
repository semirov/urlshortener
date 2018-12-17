
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import urlModel from '../models/urlModel';
import { before } from 'mocha';
use(chaiHttp);

describe('testing GET /api/existShortUrl', () => {

  before(async () => {
    await urlModel.deleteMany({}).exec();
  });

  it('validation of a nonexistent short link should be performed', async () => {
    let res = await request(server).get('/api/existShortUrl/').query({shortUrl: 'test'});
    expect(res.status).to.equal(200);
    expect(res.body).to.be.false;
  });

  it('nonvalidation of a existent short link should be performed', async () => {
    await request(server).post('/api/generateShortUrl').send({ url: 'ya.ru', shortUrl: 'test' });
    let res = await request(server).get('/api/existShortUrl/').query({shortUrl: 'test'});
    expect(res.status).to.equal(200);
    expect(res.body).to.be.true;
  });

})