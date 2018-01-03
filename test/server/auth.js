const request = require('supertest');
const app = require('../../app');
const { expect } = require('chai');
const { User } = require('../../server/models');

describe('Authentication actions', () => {
  describe('user authentication', () => {
    before((done) => {
      User.sync({ force: true }).then(() => {
        User.create({
          username: 'tester',
          email: 'test@mail.com',
          password: '1234567890',
        });
        done();
      });
    });
    it('should register user with valid credentials', (done) => {
      request(app).post('/api/user/signup')
        .send({
          username: 'testUser',
          email: 'test@test.lt',
          password: 'password',
          confirmPassword: 'password'
        }).end((err, res) => {
          expect(res.body.message).to.equal('Signup success');
          done();
        });
    });

    it("should not register a user when password doesn't match confirmPassword", (done) => {
      request(app).post('/api/user/signup')
        .send({
          username: 'testUser',
          email: 'test@test.lt',
          password: 'password',
          confirmPassword: 'passwordD'
        }).end((err, res) => {
          expect(res.body.message).to.equal("Confirmation password doesn't match");
          done();
        });
    });

    it('should not allow the user to register with an existing username', (done) => {
      request(app).post('/api/user/signup')
        .send({
          username: 'tester',
          email: 'test@test.lt',
          password: 'password',
          confirmPassword: 'passwordD'
        }).end((err, res) => {
          expect(res.body.message).to.equal("Confirmation password doesn't match");
          done();
        });
    });

    it('should not allow the user to register with an invalid email', (done) => {
      request(app).post('/api/user/signup')
        .send({
          username: 'testuser',
          email: 'test@test',
          password: 'password',
          confirmPassword: 'password'
        }).end((err, res) => {
          expect(res.body.message).to.equal('Please enter a valid email.');
          done();
        });
    });
  });
});
