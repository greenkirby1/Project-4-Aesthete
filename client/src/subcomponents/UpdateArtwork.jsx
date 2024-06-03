import { useState } from 'react'
import axios from 'axios'
import ReactCardFlip from 'react-card-flip'
import { getToken } from '../lib/auth'
import CustomForm from './CustomForm'


export default function UpdateArtwork({ artwork, flipArtworkCard, setFlipArtworkCard }) {

  const { added_on, caption, comments, id, image, likes, title, year_created } = artwork

  const [flipUpdateArtworkCard, setFlipUpdateArtworkCard] = useState(false)

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

  function loadFields() {
    return artwork
  }

  return (
    <ReactCardFlip isFlipped={flipUpdateArtworkCard}>
      {/* Card Front */}
      <div className='artwork-details'>
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
      </div>
      {/* Card Back */}
      <div className='update-form'>
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
  )
}