import ReactCardFlip from 'react-card-flip'
import { useState } from 'react'
import UpdateArtwork from '../subcomponents/UpdateArtwork'
import { styles } from '../styles/inline'

export default function ArtworkCard({ artwork }) {

  const { added_on, caption, comments, id, image, likes, title, year_created } = artwork

  const [flipArtworkCard, setFlipArtworkCard] = useState(false)

  return (
    <ReactCardFlip  className='painting' isFlipped={flipArtworkCard}>
      {/* Card Front */}
      <div style={styles.card} className='artwork-img'>
        <img onClick={() => setFlipArtworkCard(!flipArtworkCard)} src={image} alt={`${id}-${title}`} />
      </div>
      {/* Card Back */}
      <UpdateArtwork 
        artwork={artwork} 
        flipArtworkCard={flipArtworkCard} 
        setFlipArtworkCard={setFlipArtworkCard}
        styles={styles}
      />
    </ReactCardFlip >
  )
}