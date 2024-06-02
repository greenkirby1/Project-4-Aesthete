import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { getToken, getUserId } from '../../lib/auth'
import ArtworkCard from '../elements/ArtworkCard'
import CreateArtwork from '../subcomponents/CreateArtwork'

export default function MyCollections() {

  const [profile, setProfile] = useState()
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')


  useEffect(() => {
    setUserId(getUserId)
  }, [setUserId])
  
  const getProfile = useCallback(async function () {
    try {
      const { data } = await axios.get(`/api/auth/profile/${userId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      setProfile(data)
    } catch (error) {
      setError(error.response.statusText)
    }
  }, [userId])
  
  useEffect(() => {
    getProfile()
  }, [getProfile, userId])

  return (
    <>
      {profile ?
        <div className='page-container'>
          <h1>View my own collections...</h1>
          <div className='collection-wrapper'>
            {profile.created_collection.length ?
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