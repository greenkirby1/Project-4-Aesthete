import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { styles } from '../styles/inline'
import { getToken } from '../lib/auth'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)


export default function Artworks({ artworks, setSpriteMove }) {

  const gallery = useRef()

  const [show, setShow] = useState(false)
  const [currentPainting, setCurrentPainting] = useState()
  const [comment, setComment] = useState({
    text: '',
    on_artwork: ''
  })
  // const [users, setUsers] = useState()
  // const [zoomIn, setZoomIn] = useState({
  //   activeId: ''
  // })

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

  useEffect(() => {
    // async function getUsers() {
    //   try {
    //     const { data } = await axios.get('/api/users/')
    //     console.log(data)
    //     setUsers(data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // getUsers()
  }, [])


  function handleShow() {
    setShow(!show)
  }

  // function handleZoomIn(e, id) {
  //   setZoomIn({ ...zoomIn, activeId: id })
  // }

  // function handleZoomOut(e, id) {
  //   e.stopPropagation()
  //   console.log('close')
  //   console.log(id, zoomIn)
  //   if (id === zoomIn.activeId) {
  //     console.log(id === zoomIn.activeId)
  //     setZoomIn({ ...zoomIn, activeId: '' })
  //   }
  // }

  function findArtwork(e, id) {
    const foundPainting = artworks[artworks.findIndex(artwork => artwork.id === id)]
    console.log(foundPainting)
    setCurrentPainting(foundPainting)
    setShow(!show)
  }

  function handleChange(e, id) {
    setComment({ ...comment, text: e.target.value, on_artwork: id })
  }

  async function handleSubmit(e, id) {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/comments/', comment, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    } catch (error) {
      console.log(error)
    } 
  }

  // function findUser(id) {
  //   const foundUser = users[users.findIndex(user => user.id === id)]
  //   console.log(foundUser)
  // }

  return (
    <>
      <div ref={gallery} className='painting-wrapper'>
        {artworks.map(artwork => {
          const { id, image, title } = artwork
          return (
            <div
              key={`${id}-${title.split(' ').join('-')}`}
              // onClick={(e) => handleZoomIn(e, id)}
              className={`section painting`}
            >
              <img
                src={image}
                alt={title}
                // className={
                //   `${id === zoomIn.activeId ? 'zoomed-in' : ''}`
                // }
                className='painting-img'
              />
              <button className='painting-btn' onClick={(e) => findArtwork(e, id)}>Info</button>
              {/* <button
                  className={id === zoomIn.activeId ? 'show-btn' : 'hide-btn'}
                  onClick={(e) => handleZoomOut(e, id)}
                  >
                  Close
                </button> */}
            </div>
          )
        })}
      </div>
      <Modal
        isOpen={show}
        onRequestClose={handleShow}
        style={styles.modal}
        contentLabel='Artwork Info Modal'
        shouldCloseOnOverlayClick={false}
      >
        {currentPainting ?
          <div>
            <h2>{currentPainting.title} <span>&#40;{currentPainting.year_created}&#41;</span></h2>
            <button onClick={handleShow}>X</button>
            <p>{currentPainting.caption}</p>
            <div className='comments-container'>
              {currentPainting.comments.length > 0 ?
                currentPainting.comments.map(comment => {
                  const { id, text, creator } = comment
                  return (
                    <div key={id} className='comment'>
                      <p>{text}</p>
                    </div>
                  )
                })
                :
                <p>No comments yet.</p>
              }
              <form>
                <input
                  name='comment'
                  type="text"
                  placeholder='Send A Comment...'
                  onChange={(e) => handleChange(e, currentPainting.id)}
                  value={comment.text}
                />
                <button type='button' onClick={(e) => handleSubmit(e)}>Go</button>
              </form>
            </div>
          </div>
          :
          <div>Loading...</div>

        }
      </Modal>
    </>
  )
}