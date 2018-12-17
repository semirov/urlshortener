
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import urlModel from '../models/urlModel';
import { before } from 'mocha';
use(chaiHttp);




describe('testing POST /get/generateShortUrl', () => {

  before(async () => {
    await urlModel.deleteMany({}).exec();
  });

  it('short link should not be created with wrong address', async() => {
    let wrongUrl = { url: 'ya.ru2' };
    let res = await request(server).post('/api/generateShortUrl').send(wrongUrl);
    expect(res.status).to.equal(400);
  });

  it('link should not be created if there is no address', async() => {
    let wrongUrl = null;
    let res = await request(server).post('/api/generateShortUrl').send(wrongUrl);
    expect(res.status).to.equal(400);
  });

  it('for the correct URL link must be created', async() => {
    let wrongUrl = { url: 'ya.ru' }
    let res = await request(server).post('/api/generateShortUrl').send(wrongUrl);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('shortUrl');
    expect(res.body).to.have.property('fullUrl');
  });

  it('сreate your own short link for the correct URL', async() => {
    let wrongUrl = { url: 'ya.ru', shortUrl: 'test' }
    let res = await request(server).post('/api/generateShortUrl').send(wrongUrl);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('shortUrl');
    expect(res.body).to.have.property('fullUrl');
  });

  it('an attempt to create a short link with a previously used link should fail', async() => {
    let wrongUrl = { url: 'ya.ru', shortUrl: 'test' }
    let res = await request(server).post('/api/generateShortUrl').send(wrongUrl);
    expect(res.status).to.equal(400);
  });

});