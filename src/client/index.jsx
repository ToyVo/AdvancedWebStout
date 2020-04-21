import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'

import React from 'react'
import ReactDOM from 'react-dom'

import Banner from './components/Banner.jsx'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Banner greeting='World' />, document.getElementById('root'))
})
