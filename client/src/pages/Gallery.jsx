import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Canvas from '../subcomponents/Canvas'



export default function Gallery() {

  const [artworks, setArtworks] = useState()
  const [error, setError] = useState('')
  
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
  

  // const [context, setContext] = useState(null)

  // const canvasRef = useRef(null)

  // useEffect(() => {
  //   setContext(canvasRef.current.getContext('2d'))
  //   init()
    
  // }, [canvasRef, init])
  
  const spriteWidth = 250
  const spriteHeight = 300
  const spriteImg = new Image()
  spriteImg.src = '../assets/sprite.png'
  // const draw = (context, count) => {
  //   context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  //   context.fillStyle = 'blue'
  //   const delta = count % 800
  //   context.fillRect(10 + delta, 10, 100, 100)

  // }
  
  const draw = (context, count) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = 'blue'
    const delta = count % 800
    context.fillRect(10 + delta, 10, 100, 100)

  }

  function draw2(context, count) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    spriteImg.onload = () => {
      context.drawImage(spriteImg, 0, 0, 250, 300, 0, 0, 250, 300)
    }
  }

  return (
    <>
      <h1>Welcome to the Gallery...</h1>
      {/* <Canvas draw={draw} width='800' height='500' /> */}
      <Canvas draw={draw2} width='800' height='500' />
    </>
  )
}