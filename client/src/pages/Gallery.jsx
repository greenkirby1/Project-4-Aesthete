import { useState, useEffect, useRef } from 'react'
import axios from 'axios'



export default function Gallery() {

  const [artworks, setArtworks] = useState()
  const [error, setError] = useState('')
  const [spriteMove, setSpriteMove] = useState('sprite')
  const [zoomIn, setZoomIn] = useState({
    activeId: ''
  })

  useEffect(() => {
    async function getArtworks() {
      try {
        const { data } = await axios.get('/api/artworks/')
        console.log(data)
        setArtworks(data)
      } catch (error) {
        setError(error.message)
      }
    }
    getArtworks()
  }, [])


  function handleZoomIn(e, id) {
    setZoomIn({ ...zoomIn, activeId: id })
  }

  function handleZoomOut(e, id) {
    console.log('close')
    if (id === zoomIn.activeId) {
      setZoomIn({ ...zoomIn, activeId: '' })
    }
  }

  function handleScroll(e) {
    console.log(e)
  }

  return (
    <>
      <h1>Welcome to the Gallery...</h1>
      <div className='gallery-container'>
        {artworks ?
          artworks.map(artwork => {
            const { id, image, title, ...rest } = artwork
            return (
              <div
                key={`${id}-${title.split(' ').join('-')}`}
                onClick={(e) => handleZoomIn(e, id)}
                className={
                  `painting 
                  ${id === zoomIn.activeId ? 'zoomed-in' : ''}`
                }
              >
                <img src={image} alt={title} />
                <button 
                  className={id === zoomIn.activeId ? 'show-btn' : 'hide-btn'}
                  onClick={(e) => handleZoomOut(e, id)}
                >
                  Close
                </button>
              </div>
            )
          })
          :
          error ?
            <h2>{error}</h2>
            :
            <h2>Loading...</h2>
        }
      </div>
      <div className={spriteMove} onScroll={handleScroll}></div>
    </>
  )
}