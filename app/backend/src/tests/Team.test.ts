import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mostTeams = [
	{
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
	{
		"id": 3,
		"teamName": "Botafogo"
	},
] as any[];

const oneTeam = {
  "id": 1,
  "teamName": "Avaí/Kindermann"
} as any;

describe('team test', () => {
  describe('get all teams', () => {
    let chaiHttpResponse: Response;
    beforeEach(() => {
      sinon.stub(Team, 'findAll').resolves(mostTeams);
    });
    afterEach(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('test get all teams return correctly', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
        .send();

        expect(chaiHttpResponse.status).to.be.eq(200);
        expect(chaiHttpResponse.body).to.be.deep.eq(mostTeams);
    });
  });
  describe('get one team by id', () => {
    let chaiHttpResponse: Response;
    beforeEach(() => {
      sinon.stub(Team, 'findOne').resolves(oneTeam);
    });
    afterEach(() => {
      (Team.findOne as sinon.SinonStub).restore();
    });

    it('test get one team return correctly', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1')
        .send();

        expect(chaiHttpResponse.status).to.be.eq(200);
        expect(chaiHttpResponse.body).to.be.deep.eq(oneTeam);
    });
    it('test get one team return incorrectly', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/a')
        .send();

        expect(chaiHttpResponse.status).to.be.eq(404);
        expect(chaiHttpResponse.body.message).to.be.eq('not found id');
    });
  })
})