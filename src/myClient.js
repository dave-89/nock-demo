'use strict'

import fetch from 'node-fetch'
import isJSON from 'is-json'
import { URLSearchParams } from 'url'

export default class MyClient {
  simpleGET (url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(resp => Promise.all([resp.status, resp.text()]))
        .then(([status, body]) => {
          resolve({
            status: status,
            body: isJSON(body) ? JSON.parse(body) : body
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  postWithForm (url, form) {
    const params = new URLSearchParams()
    form.forEach(element => {
      params.append(element.key, element.value)
    })
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        body: params
      })
        .then(resp => Promise.all([resp.status, resp.text()]))
        .then(([status, body]) => {
          resolve({
            status: status,
            body: isJSON(body) ? JSON.parse(body) : body
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
