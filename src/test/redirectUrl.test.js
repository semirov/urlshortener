
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import urlModel from '../models/urlModel';
import { before } from 'mocha';
use(chaiHttp);

describe('testing GET /redirectUrl', () => {

  before(async () => {
    await urlModel.deleteMany({}).exec();
  });

  it('redirection should work', async () => {
    await request(server).post('/api/generateShortUrl').send({ url: 'ya.ru', shortUrl: 'test' });
    let res = await request(server).get('/api/redirectUrl/test');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('fullUrl', 'http://ya.ru');
  });

})