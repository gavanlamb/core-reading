import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../src';

describe('Examples', () => {
  it('should getReadingsForDevice all examples', () =>
    request(Server)
      .get('/api/examples')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .of.length(2);
      }));

  it('should add a new example', () =>
    request(Server)
      .post('/api/examples')
      .send({ name: 'test' })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should getReadingsForDevice an example by id', () =>
    request(Server)
      .get('/api/examples/2')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));
});
