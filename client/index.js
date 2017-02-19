'use strict'

import 'babel-register'
import 'babel-polyfill'

import { render, h } from 'preact'
import { Provider, connect } from 'preact-redux'

window.makeUser = async () => {
  const user = await fetch(`http://localhost:3000/user`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'test',
      token: 'test',
    })
  })

  const json = await user.json()
  console.log(json)
}
