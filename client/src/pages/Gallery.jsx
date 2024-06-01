import { useState, useEffect } from "react"
import axios from 'axios'


export default function Gallery() {

  const [artworks, setArtworks] = useState()
  const [error, setError] = useState('')

  useEffect(() => {
    async function getArtworks() {
      try {
        const { data } = await axios.get('/api/artworks')
        console.log(data)
        setArtworks(data)
      } catch (error) {
        setError(error.message)
      }
    }
    getArtworks()
  }, [])

  return (
    <>
      <h1>Welcome to the Gallery...</h1>
      {/* <canvas width='100vw' height='100vh'></canvas> */}
    </>
  )
}