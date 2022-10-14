import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Match from '../database/models/Match';
import Token from '../helpers/Token';
import ServiceTeam from '../service/ServiceTeam';
import ServiceMatch from '../service/ServiceMatch';

chai.use(chaiHttp);

const { expect } = chai;

const mostMatch = [
	{
		"id": 1,
		"homeTeam": 16,
		"homeTeamGoals": 1,
		"awayTeam": 8,
		"awayTeamGoals": 1,
		"inProgress": false,
		"teamHome": {
			"teamName": "São Paulo"
		},
		"teamAway": {
			"teamName": "Grêmio"
		}
	},
	{
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
		}
	},
] as any[];

const matchInProgress = [
	{
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
		}
	},
] as any[];

const insertMatch = {
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
};

const creationMatch = {
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
} as Match;

const notEqualMatch = {
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 16,
  "awayTeamGoals": 2,
  "inProgress": true,
};

describe('matchs test', () => {
  describe('test router match get', () => {
    let chaiHttpResponse: Response;

    afterEach(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('test get all match return correctly', async () => {
      sinon.stub(Match, 'findAll').resolves(mostMatch);
      chaiHttpResponse = await chai.request(app)
        .get('/matches')
        .send();

        expect(chaiHttpResponse.status).to.be.eq(200);
        expect(chaiHttpResponse.body).to.be.deep.eq(mostMatch);
    });

    it('test get all match in progress return correctly', async () => {
      sinon.stub(Match, 'findAll').resolves(matchInProgress);
      chaiHttpResponse = await chai.request(app)
        .get('/matches?inProgress=true')
        .send();

        expect(chaiHttpResponse.status).to.be.eq(200);
        expect(chaiHttpResponse.body).to.be.deep.eq(matchInProgress);
    });

    it('test get all match in progress return incorrectly', async () => {
      sinon.stub(Match, 'findAll').resolves(matchInProgress);
      chaiHttpResponse = await chai.request(app)
        .get('/matches?inProgress=jambo')
        .send();

        expect(chaiHttpResponse.status).to.be.eq(404);
        expect(chaiHttpResponse.body.message).to.be.deep.eq('InProgress not found');
    });
  });

  describe('test created match', () => {
    let chaiHttpResponse: Response;
    beforeEach(() => {
      sinon.stub(Match, 'create').resolves(creationMatch);
      sinon.stub(ServiceTeam, 'GetByIdTeam').resolves();
    });

    afterEach(() => {
      (Match.create as sinon.SinonStub).restore();
      (ServiceTeam.GetByIdTeam as sinon.SinonStub).restore()
    });

    it('test route for create a new match', async () => {
      sinon.stub(Token, 'Verificate').resolves();
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'token')
        .send(insertMatch);

        expect(chaiHttpResponse.status).to.be.eq(201);
        expect(chaiHttpResponse.body).to.be.deep.eq(creationMatch);
        (Token.Verificate as sinon.SinonStub).restore()
    });

    it('test route for create a new match', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'é_o_testas')
        .send(insertMatch);

        expect(chaiHttpResponse.status).to.be.eq(401);
        expect(chaiHttpResponse.body.message).to.be.deep.eq('Token must be a valid token');
    });

    it('test if dont create with invalid token', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .send(insertMatch);

        expect(chaiHttpResponse.status).to.be.eq(401);
        expect(chaiHttpResponse.body.message).to.be.deep.eq('Token must be a valid token');
    });

    it('test if dont create on duplicate team', async () => {
      sinon.stub(Token, 'Verificate').resolves();
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'token')
        .send(notEqualMatch);

        expect(chaiHttpResponse.status).to.be.eq(401);
        expect(chaiHttpResponse.body.message).to.be.deep.eq('It is not possible to create a match with two equal teams');
        (Token.Verificate as sinon.SinonStub).restore()
    });
  })
})