
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import urlModel from '../models/urlModel';
import { before } from 'mocha';
use(chaiHttp);

describe('testing POST /api/validateUrl', () => {

    before(async () => {
        await urlModel.deleteMany({}).exec();
    });

    it('verification of a known invalid url', async () => {
        let res = await request(server).post('/api/validateUrl/').send({ url: 'ya.ru2' });
        expect(res.status).to.equal(200);
        expect(res.body).to.be.false;
    });

    it('verification of a known valid url', async () => {
        let res = await request(server).post('/api/validateUrl/').send({ url: 'ya.ru' });
        expect(res.status).to.equal(200);
        expect(res.body).to.be.true;
    });



})