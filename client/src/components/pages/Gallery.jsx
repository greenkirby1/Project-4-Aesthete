import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Artworks from '../subcomponents/Artworks'




export default function Gallery() {

  const [artworks, setArtworks] = useState()
  const [error, setError] = useState('')
  const [spriteMove, setSpriteMove] = useState('stand')
  const [prevScrollPost, setPrevScrollPosition] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('')
  
  
  const handleScroll = useCallback(() => {
    const scrollPost = window.scrollY
    
    if (scrollPost > prevScrollPost) {
      console.log('scrolling down')
      setScrollDirection('down')
      setSpriteMove('walk-right')
    } else if (scrollPost < prevScrollPost) {
      console.log('scrolling up')
      setScrollDirection('up')
      setSpriteMove('walk-left')
    }
    
    setPrevScrollPosition(scrollPost)

  }, [prevScrollPost])
  
  
  useEffect(() => {
    async function getArtworks() {
      try {
        const { data } = await axios.get('/api/artworks/')
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
        {artworks ?
          <Artworks 
            artworks={artworks} 
            setSpriteMove={setSpriteMove}
          />
          :
          error ?
            <h2>{error}</h2>
            :
            <h2>Loading...</h2>
        }
        <div className={`sprite ${spriteMove}`} ></div>
    </>
  )
}