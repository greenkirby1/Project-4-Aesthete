import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)


export default function Artworks({ artworks, setSpriteMove }) {

  const gallery = useRef()

  const [zoomIn, setZoomIn] = useState({
    activeId: ''
  })

  useGSAP(() => {
    if (artworks) {
      let sections = gsap.utils.toArray('.section')

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: document.querySelector('.painting-wrapper'),
          pin: true,
          scrub: 1,
          // snap: 1 / (sections.length - 1),
          end: () => '+=' + document.querySelector('.painting-wrapper').offsetWidth * 10
        }
      })

      ScrollTrigger.addEventListener('scrollEnd', () => {
        setSpriteMove('stand')
      })
    }
  }, { scope: gallery })


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

  return (
    <div ref={gallery} className='painting-wrapper'>
      {artworks.map(artwork => {
            const { id, image, title } = artwork
            return (
              <div
                key={`${id}-${title.split(' ').join('-')}`}
                onClick={(e) => handleZoomIn(e, id)}
                className={`section painting`}
              >
                <img 
                  src={image} 
                  alt={title} 
                  className={
                    `${id === zoomIn.activeId ? 'zoomed-in' : ''}`
                  }
                />
                <button
                  className={id === zoomIn.activeId ? 'show-btn' : 'hide-btn'}
                  onClick={(e) => handleZoomOut(e, id)}
                >
                  Close
                </button>
              </div>
            )
          })}
    </div>
  )
}