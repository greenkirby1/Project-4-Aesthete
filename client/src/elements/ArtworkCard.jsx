import ReactCardFlip from 'react-card-flip'
import { useState } from 'react'
import UpdateArtwork from '../subcomponents/UpdateArtwork'

export default function ArtworkCard({ artwork }) {

  const { added_on, caption, comments, id, image, likes, title, year_created } = artwork

  const [flipArtworkCard, setFlipArtworkCard] = useState(false)


  return (
    <ReactCardFlip className='painting' isFlipped={flipArtworkCard}>
      {/* Card Front */}
      <div className='artwork-img'>
        <img onClick={() => setFlipArtworkCard(!flipArtworkCard)} src={image} alt={`${id}-${title}`} />
      </div>
      {/* Card Back */}
      <UpdateArtwork 
        artwork={artwork} 
        flipArtworkCard={flipArtworkCard} 
        setFlipArtworkCard={setFlipArtworkCard}
      />
    </ReactCardFlip >
  )
}