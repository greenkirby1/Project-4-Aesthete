import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'



export default function Gallery() {

  gsap.registerPlugin(useGSAP)

  const gallery = useRef()

  const [scrollWidth, setScrollWidth] = useState('')
  const [scrollDirection, setScrollDirection] = useState('up')
  const [scrollY, setScrollY] = useState(0)

  let sections = gsap.utils.toArray('.section')

  useGSAP(() => {
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.painting-wrapper',
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => '+=' + scrollWidth
      }
    })
  }, { scope: gallery })
  

  const [artworks, setArtworks] = useState()
  const [error, setError] = useState('')
  const [spriteMove, setSpriteMove] = useState('stand')
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
    setScrollWidth(gallery.current.clientWidth)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

  }, [])


  function handleZoomIn(e, id) {
    setZoomIn({ ...zoomIn, activeId: id })
  }

  function handleZoomOut(e, id) {
    e.stopPropagation()
    console.log('close')
    console.log(id, zoomIn)
    if (id === zoomIn.activeId) {
      console.log(id === zoomIn.activeId)
      setZoomIn({ ...zoomIn, activeId: '' })
    }
  }
  
  function handleScroll() {
    console.log('scrolling')
    console.log(window.scrollX)
    setScrollY(window.scrollX)
  }

  function handleSpriteMove() {
    if (scrollY - 0 > 17) {
      setSpriteMove('right-walk')
    } else {
      setSpriteMove('left-walk')
    }
  }
  
  console.log(scrollY)
  return (
    <>
      <div ref={gallery} className='painting-wrapper'>
        {artworks ?
          artworks.map(artwork => {
            const { id, image, title, ...rest } = artwork
            return (
              <div
                key={`${id}-${title.split(' ').join('-')}`}
                onClick={(e) => handleZoomIn(e, id)}
                className={
                  `section painting 
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
        <div className={`sprite walk-left ${spriteMove}`} ></div>
    </>
  )
}