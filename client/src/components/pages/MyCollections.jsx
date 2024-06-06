import { useState } from 'react'
import ArtworkCard from '../elements/ArtworkCard'
import CreateArtwork from '../subcomponents/CreateArtwork'
import { useOutletContext } from 'react-router-dom'

export default function MyCollections() {

  const [profile, setProfile, userId, setUserId, error, setError, getProfile] = useOutletContext()

  const [show, setShow] = useState(false)



  function handleShow() {
    setShow(!show)
  }


  return (
    <>
      {profile ?
        <div className='page-container'>
          <div className='collection-wrapper'>
            {profile && profile.created_collection.length ?
              profile.created_collection.map(artwork => {
                const { added_on, caption, comments, id, image, likes, title, year_created } = artwork
                return (
                  <ArtworkCard key={id} artwork={artwork} getProfile={getProfile} />
                )
              })
              :
              profile.is_artist === true ?
                <CreateArtwork userId={userId} getProfile={getProfile} />
                :
                <h2>You haven&apos;t created any artworks...</h2>
            }
            <CreateArtwork userId={userId} getProfile={getProfile} />
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