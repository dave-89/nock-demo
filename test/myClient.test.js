import MyClient from '../src/myClient'
import chai from 'chai'

const expect = chai.expect

describe('myClient', () => {
  before('set up', () => {
    this.myClient = new MyClient()
  })
  describe('simple GET', () => {
    it('without nock', () => {
      this.myClient.simpleGET()
        .then(resp => {
          expect(resp.first).to.be.equal('one')
        })
    })
  })
})
