// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
import { app } from '../../src/app';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;
const validUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
} as any;

describe('user login', () => {
  describe('route post /login', () => {
    let chaiHttpResponse: Response;
    beforeEach(() => {
    });
    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
    it('Test Valid Token', async () => {
      sinon.stub(User, 'findOne').resolves(validUser);
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: "user@user.com",
          password: "secret_user"
        });
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });
    it('Test invalid email', async () => {
      sinon.stub(User, 'findOne').resolves(validUser);
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.co',
          password: 'secret_admin',
        });
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.eq('Incorrect email or password');
    })
    it('Test invalid password', async () => {
      sinon.stub(User, 'findOne').resolves(validUser);
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_invalid',
        });
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.eq('Incorrect email or password');
    })
    it('Test without email', async () => {
      sinon.stub(User, 'findOne').resolves(validUser);
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: 'secret_admin',
        });
      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body.message).to.eq('All fields must be filled');
    })
    it('Test without password', async () => {
      sinon.stub(User, 'findOne').resolves(validUser);
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
        });
      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body.message).to.eq('All fields must be filled');
    })
  })
})
