// one time imports
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'

import axios from 'axios'

// once the document is ready
$(document).ready(() => {
  $('.gameTitleLink').click((event) => {
    event.preventDefault()
    openGameModal(event.currentTarget.href)
  })
})

/**
 * open game details
 * @param {string} url url to get data from
 */
function openGameModal (url) {
  axios
    .get(url)
    .then((response) => {
      const { data } = response
      $('#boardGameModalLabel').text(`${data.name} - ${data.year}`)
      const list = $('#boardGameModalBody').html($('<ul>'))
      if (data.rating) {
        list.append($('<li>').text(`Rated ${data.rating} out of 10.`))
      }

      if (data.maxPlayers) {
        list.append(
          $('<li>').text(
            `For ${data.minPlayers ? data.minPlayers : 'up'} to ${
              data.maxPlayers
            } players.`
          )
        )
      } else if (data.minPlayers) {
        list.append($('<li>').text(`For ${data.minPlayers} players.`))
      }

      if (data.maxPlayers) {
        list.append(
          $('<li>').text(
            `Takes ${data.minPlaytime ? data.maxPlayers : 'up'} to ${
              data.maxPlaytime
            } minutes.`
          )
        )
      } else if (data.minPlaytime) {
        list.append($('<li>').text(`Takes ${data.minPlaytime} minutes.`))
      }

      if (data.minAge) {
        list.append($('<li>').text(`For ages ${data.minAge} and up.`))
      }

      if (data.designers) {
        list.append($('<li>').text(`Designed by ${data.designers.join(', ')}.`))
      }

      if (data.artists) {
        list.append($('<li>').text(`Art by ${data.artists.join(', ')}.`))
      }

      if (data.publishers) {
        list.append(
          $('<li>').text(`Published by ${data.publishers.join(', ')}.`)
        )
      }

      $('#boardGameModal').modal()
    })
    .catch((error) => {
      console.error(error.message)
    })
}
