import { useState } from 'react'
import axios from 'axios'
import ReactCardFlip from 'react-card-flip'
import { getToken } from '../lib/auth'
import CustomForm from './CustomForm'


export default function CreateArtwork({ userId, getProfile }) {

  const [flipCreateArtworkCard, setFlipCreateArtworkCard] = useState(false)

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


  async function handleCreateArtwork(formData) {
    console.log(formData)
    try {
      await axios.post('/api/artworks/', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      getProfile()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ReactCardFlip isFlipped={flipCreateArtworkCard}>
      {/* Card Front */}
      <div className='create-artwork'>
        <button
          className='create-artwork-btn'
          onClick={() => setFlipCreateArtworkCard(!flipCreateArtworkCard)
          }>
          +
        </button>
      </div>
      {/* Card Back */}
      <div className='create-artwork-form'>
        <CustomForm
          request={handleCreateArtwork}
          fields={fields}
          submit='Add to Collection'
          flipCreateArtworkCard={flipCreateArtworkCard}
          setFlipCreateArtworkCard={setFlipCreateArtworkCard}
        />
        <button 
          onClick={() => setFlipCreateArtworkCard(!flipCreateArtworkCard)} 
          className='cancel-btn'
        >
          Cancel
        </button>
      </div>
    </ReactCardFlip>
  )
}