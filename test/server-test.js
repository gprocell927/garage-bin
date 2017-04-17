const chai = require('chai')
const expect = chai.expect
const chaiHTtp = require('chai-http')
const app = require('../server.js')

describe('Server', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
        .then(() => {
          return knex.seed.run()
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

  context('app', () => {
  it('should exist', () => {
    assert(app)
  })
}) //end of context app block

  context('GET /api/items', () => {
    it('should return all items', (done) => {
      chai.request(app)
      .get('/api/items')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
    })
  })


})//end of describe server block
