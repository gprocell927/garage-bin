const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server.js')

const environment = 'test';
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);
chai.use(chaiHttp)

describe('Server', () => {
  context('app', () => {
  it('should exist', () => {
    expect(app).to.exist
    })
  })
})    //end of context app block


describe('Endpoints', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
        .then(() => {
          knex.seed.run()
          .then(() => {
            done()
          })
        })
    })
  })

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done()
    })
  })


  context('GET /api/items', () => {
    it('should return all items', (done) => {
      chai.request(app)
      .get('/api/items')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('array')
        expect(res.body.length).to.equal(2)
        expect(res.body[0]).to.have.property('name')
        expect(res.body[0].name).to.equal('Rubber Chicken')
        expect(res.body[0]).to.have.property('reason')
        expect(res.body[0].reason).to.equal('It is fun')
        expect(res.body[0]).to.have.property('cleanliness')
        expect(res.body[0].cleanliness).to.equal('Dusty')
        done()
      })
    })
  }) // end of GET /api/items block

  context('GET /api/items/:id', () => {
    it('should return a single item', (done) => {
      chai.request(app)
      .get('/api/items/1')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body[0]).to.be.a('array')
        expect(res.body[0]).to.have.property('name')
        expect(res.body[0].name).to.equal('Rubber Chicken')
        expect(res.body[0]).to.have.property('reason')
        expect(res.body[0].reason).to.equal('It is fun')
        expect(res.body[0]).to.have.property('cleanliness')
        expect(res.body[0].reason).to.equal('Dusty')
        done()
      })
    })
  }) // end of GET /api/items/:id

  context('POST /api/items', () => {
      it('should add an item', (done) => {
        chai.request(app)
        .post('/api/items')
        .send({
          name: 'Pink Marshmallow Peeps from 1995',
          reason: 'They never go bad and they\'re delicious',
          cleanliness:'Rancid'
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.a('array')
          expect(res.body).to.have.property('name')
          expect(res.body.name).to.equal('Pink Marshmallow Peeps from 1995')
          expect(res.body).to.have.property('reason')
          expect(res.body.reason).to.equal('They never go bad and they\'re delicious')
          expect(res.body).to.have.property('cleanliness')
          expect(res.body.reason).to.equal('Rancid')
          done()
        })
      })
    }) //end of POST /api/items


  context('PATCH /api/items/:id', () => {
      it('should edit the cleanliness field of an item ', (done) => {
        chai.request(app)
        .patch('/api/items/1')
        .send({
          cleanliness:'Rancid'
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.a('array')
          expect(res.body).to.have.length(1)
          expect(res.body[0].name).to.equal('Rubber Chicken')
          expect(res.body[0].cleanliness).to.equal('Rancid')
          done()
        })
      })
    }) //end of PATCH /api/items/:id

})//end of describe server block
