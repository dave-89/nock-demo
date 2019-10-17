import MyClient from '../src/myClient'
import chai from 'chai'
import nock from 'nock'
const expect = chai.expect

describe('myClient', () => {
  before('set up', () => {
    this.myClient = new MyClient()
  })
  describe('simple GET', () => {
    describe('without nock', () => {
      before('setup url', () => {
        this.baseURL = 'https://httpbin.org'
      })
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
        this.myClient.simpleGET(`${this.baseURL}/get`)
          .then(resp => {
            expect(resp.status).to.be.equal(200)
            expect(resp.body.url).to.be.equal(`${this.baseURL}/get`)
            done()
          })
          .catch(err => done(err))
      })
      it('404 resource not found', (done) => {
        this.myClient.simpleGET(`${this.baseURL}/status/404`)
          .then(resp => {
            expect(resp.status).to.be.equal(404)
            expect(resp.body).to.be.empty
            done()
          })
          .catch(err => done(err))
      })
      it('500 internal server error', (done) => {
        this.myClient.simpleGET(`${this.baseURL}/status/500`)
          .then(resp => {
            expect(resp.status).to.be.equal(500)
            done()
          })
          .catch(err => done(err))
      })
    })
    describe('with nock', () => {
      before('create nock', () => {
        this.baseURL = 'https://www.this.doesn.exist.example.com'
        this.scope = nock(this.baseURL)
      })
      after('clean nock', () => {
        this.scope.isDone()
      })
      it('non existing domain', (done) => {
        this.scope
          .get('/simple/get')
          .replyWithError({
            code: 'ENOTFOUND'
          })
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
        this.scope
          .get('/get')
          .reply(200, {
            someKey: 'someValue'
          })
        this.myClient.simpleGET(`${this.baseURL}/get`)
          .then(resp => {
            expect(resp.status).to.be.equal(200)
            expect(resp.body.someKey).to.be.equal('someValue')
            done()
          })
          .catch(err => done(err))
      })
      it('404 resource not found', (done) => {
        this.scope
          .get('/status/404')
          .reply(404, '')
        this.myClient.simpleGET(`${this.baseURL}/status/404`)
          .then(resp => {
            expect(resp.status).to.be.equal(404)
            expect(resp.body).to.be.empty
            done()
          })
          .catch(err => done(err))
      })
      it('500 internal server error', (done) => {
        this.scope
          .get('/status/500')
          .reply(500, '')
        this.myClient.simpleGET(`${this.baseURL}/status/500`)
          .then(resp => {
            expect(resp.status).to.be.equal(500)
            done()
          })
          .catch(err => done(err))
      })
    })
  })
})
