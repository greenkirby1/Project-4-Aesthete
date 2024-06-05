import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Artworks from '../subcomponents/Artworks'




export default function Gallery() {

  // const [scrollWidth, setScrollWidth] = useState('')
  // const [scrollDirection, setScrollDirection] = useState('up')
  // const [scrollY, setScrollY] = useState(0)
  const [artworks, setArtworks] = useState()
  const [error, setError] = useState('')
  const [spriteMove, setSpriteMove] = useState('stand')

  
  
  
  


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
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
    
  }, [])
  
  // function handleKeyDown(e) {
  //   console.log(e.Key, 'is pressed!')
  // }

  
  
  function handleScroll() {
    console.log('scrolling')
    console.log(window.scrollY)
  }

  function handleSpriteMove() {
    if (scrollY - 0 > 17) {
      setSpriteMove('right-walk')
    } else {
      setSpriteMove('left-walk')
    }
  }

  
  return (
    <>
      {/* <div ref={gallery} className='painting-wrapper'> */}
        {artworks ?
          <Artworks artworks={artworks} />
          :
          error ?
            <h2>{error}</h2>
            :
            <h2>Loading...</h2>
        }
      {/* </div> */}
        <div className={`sprite walk-left ${spriteMove}`} ></div>
    </>
  )
}