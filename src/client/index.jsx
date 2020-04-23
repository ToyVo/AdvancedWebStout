import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App.jsx'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'))
})
