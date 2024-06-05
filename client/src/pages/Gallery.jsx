import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'

import Artworks from '../subcomponents/Artworks'




export default function Gallery() {

  // const [scrollWidth, setScrollWidth] = useState('')
  // const [scrollY, setScrollY] = useState(0)
  const [artworks, setArtworks] = useState()
  const [error, setError] = useState('')
  const [spriteMove, setSpriteMove] = useState('stand')
  const [prevScrollPost, setPrevScrollPosition] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('')

  
  
  
  


  
  
  const handleScroll = useCallback(() => {
    console.log('scrolling')
    console.log(window.scrollY)
    const scrollPost = window.scrollY
    
    if (scrollPost > prevScrollPost) {
      console.log('scrolling down')
      console.log(scrollPost, prevScrollPost)
      setScrollDirection('down')
      setSpriteMove('walk-right')
    } else if (scrollPost < prevScrollPost) {
      console.log('scrolling up')
      setScrollDirection('up')
      console.log(scrollPost, prevScrollPost)
      setSpriteMove('walk-left')
    }
    
    setPrevScrollPosition(scrollPost)

    if (scrollPost === prevScrollPost) {
      console.log('standing')
      setSpriteMove('stand')
    }
  }, [prevScrollPost])
  
  
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
  

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])


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
        <div className={`sprite ${spriteMove}`} ></div>
    </>
  )
}