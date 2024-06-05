import { useState } from 'react'
import ArtworkCard from '../elements/ArtworkCard'
import CreateArtwork from '../subcomponents/CreateArtwork'
import { useOutletContext } from 'react-router-dom'

export default function MyCollections() {

  const styles = {
    card: {
      padding: '1rem',
      width: '400px',
      height: '600px',
      display: 'flex',
      justifyContent: 'space-evenly'
    },
  }

  const [profile, userId, error] = useOutletContext()
  
  const [show, setShow] = useState(false)


  
  function handleShow() {
    setShow(!show)
  }


  return (
    <>
      {profile ?
        <div className='page-container'>
          <div className='collection-wrapper'>
            {profile.created_collection.length > 0 ?
              profile.created_collection.map(artwork => {
                const { added_on, caption, comments, id, image, likes, title, year_created } = artwork
                return (
                  <ArtworkCard key={id} artwork={artwork} />
                )
              })
              :
              profile.is_artist === true ?
                <CreateArtwork userId={userId} />
                :
                <h2>You haven&apos;t created any artworks...</h2>
            }
          </div>
        </div>
        :
        error ?
          <p>{error}</p>
          :
          <h2>Loading...</h2>
      }
    </>
  )
}