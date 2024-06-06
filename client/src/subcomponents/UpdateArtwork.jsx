import { useState } from 'react'
import axios from 'axios'
import ReactCardFlip from 'react-card-flip'
import { getToken } from '../lib/auth'
import CustomForm from './CustomForm'
import { styles } from '../styles/inline'
import Modal from 'react-modal'


export default function UpdateArtwork({ artwork, flipArtworkCard, setFlipArtworkCard, getProfile }) {

  const { added_on, caption, comments, id, image, likes, title, year_created } = artwork

  const [flipUpdateArtworkCard, setFlipUpdateArtworkCard] = useState(false)
  const [show, setShow] = useState(false)

  const fields = [
    {
      name: 'title',
      type: 'text',
      placeholder: 'What is this artwork called?'
    },
    {
      name: 'image',
      type: 'file',
      placeholder: 'Upload your beautiful work'
    },
    {
      name: 'year_created',
      type: 'number',
      placeholder: 'Enter the year it was made'
    },
    {
      name: 'caption',
      type: 'text',
      placeholder: 'What is your artwork about?'
    }
  ]

  async function handleUpdateArtwork(formData) {
    console.log(formData)
    try {
      await axios.put(`/api/artworks/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete() {
    try {
      await axios.delete(`/api/artworks/${id}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      setShow(!show)
      getProfile()
    } catch (error) {
      console.log(error)
    }
  }

  function loadFields() {
    return artwork
  }

  function handleShow() {
    setShow(!show)
  }

  return (
    <>
      <ReactCardFlip isFlipped={flipUpdateArtworkCard}>
        {/* Card Front */}
        <div style={styles.card} className='artwork-details'>
          <h3>{title} <span>&#40;{year_created}&#41;</span></h3>
          <p>{caption}</p>
          <div className='comments-container'>
            {comments.length > 0 ?
              comments.map(comment => {
                const { id, text, creator } = comment
                return (
                  <div key={id} className='comment'>
                    <p><span>{creator}</span> {text}</p>
                  </div>
                )
              })
              :
              <p>No comments yet.</p>
            }
          </div>
          <p>Thia artwork has {likes.length} admirers.</p>
          <div className='btn-wrapper'>
            <button
              onClick={() => setFlipArtworkCard(!flipArtworkCard)}
              className='update-artwork-btn'
            >
              Back
            </button>
            <button
              onClick={() => setFlipUpdateArtworkCard(!flipUpdateArtworkCard)}
              className='update-artwork-btn'
            >
              Change Details
            </button>
            <button
              onClick={handleShow}
              className='update-artwork-btn'
            >
              Delete
            </button>
          </div>
        </div>
        {/* Card Back */}
        <div style={styles.card} className='update-form'>
          <CustomForm
            request={handleUpdateArtwork}
            fields={fields}
            submit='Save Changes'
            onLoad={loadFields}
            flipArtworkCard={flipArtworkCard}
            setFlipArtworkCard={setFlipArtworkCard}
            flipUpdateArtworkCard={flipUpdateArtworkCard}
            setFlipUpdateArtworkCard={setFlipUpdateArtworkCard}
          />
          <button
            onClick={() => setFlipUpdateArtworkCard(!flipUpdateArtworkCard)}
            className='cancel-btn'
          >
            Cancel
          </button>
        </div>
      </ReactCardFlip>
      <Modal
        isOpen={show}
        onRequestClose={handleShow}
        style={styles.modal}
        contentLabel='Delete Modal'
        shouldCloseOnOverlayClick={false}
      >
        <h4>Are you sure you want to delete this artwork forever?</h4>
        <div className='btn-wrapper'>
          <button onClick={handleShow}>No</button>
          <button onClick={handleDelete}>Yes</button>
        </div>
      </Modal>
    </>
  )
}