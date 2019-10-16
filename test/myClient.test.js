import MyClient from '../src/myClient'
import chai from 'chai'
const expect = chai.expect

describe('myClient', () => {
  before('set up', () => {
    this.myClient = new MyClient()
  })
  describe('simple GET', () => {
    describe('without nock', () => {
      it('non existing domain', (done) => {
        this.myClient.simpleGET('https://www.this.doesn.exist.example.com/simple/get')
          .then(resp => {
            done(resp)
          })
          .catch(error => {
            expect(error.code).to.be.equal('ENOTFOUND')
            done()
          })
          .catch(err => done(err))
      })
      it('200 OK', (done) => {
        this.myClient.simpleGET('https://httpbin.org/get')
          .then(resp => {
            expect(resp.status).to.be.equal(200)
            expect(resp.body.url).to.be.equal('https://httpbin.org/get')
            done()
          })
          .catch(err => done(err))
      })
      it('404 resource not found', (done) => {
        this.myClient.simpleGET('https://httpbin.org/status/404')
          .then(resp => {
            expect(resp.status).to.be.equal(404)
            expect(resp.body).to.be.empty
            done()
          })
          .catch(err => done(err))
      })
      it('500 internal server error', (done) => {
        this.myClient.simpleGET('https://httpbin.org/status/500')
          .then(resp => {
            expect(resp.status).to.be.equal(500)
            done()
          })
          .catch(err => done(err))
      })
    })
  })
})
