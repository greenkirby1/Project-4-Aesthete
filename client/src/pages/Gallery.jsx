import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParallax } from 'react-scroll-parallax'



export default function Gallery() {

  const { ref } = useParallax({translateX: ['-100px', '200px']})

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
    console.log('scrolling')
    console.log(e.Key)
  }

  return (
    <>
      <div ref={ref} onKeyDown={handleScroll}>
        <div className='painting-wrapper'>
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
        <div className={spriteMove} ></div>
      </div>
    </>
  )
}