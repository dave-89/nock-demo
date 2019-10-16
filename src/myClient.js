'use strict'

import fetch from 'node-fetch'

export default class MyClient {
  simpleGET () {
    return new Promise((resolve, reject) => {
      fetch('127.0.0.1:9999/simple/get')
        .then(resp => resp.json())
        .then(resp => {
          resolve({
            first: resp.one,
            second: resp.two
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
