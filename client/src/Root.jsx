import axios from 'axios'
import { useEffect, useState } from 'react'



function Root() {

  useEffect(() => {
    async function getArtworkData() {
      try {
        const { data } = await axios.get('/api/artworks')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getArtworkData()
  })

  return(
    <h1>Hello World</h1>
  )
}

export default Root
