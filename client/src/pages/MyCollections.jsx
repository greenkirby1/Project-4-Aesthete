import { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken, getUserId } from '../../lib/auth'
import ArtworkCard from '../elements/ArtworkCard'

export default function MyCollections() {

  const [profile, setProfile] = useState()
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')

  
  useEffect(() => {
    setUserId(getUserId)
  }, [])
  
  useEffect(() => {
    async function getProfile() {
      try {
        const { data } = await axios.get(`/api/auth/profile/${userId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        console.log(data)
        setProfile(data)
      } catch (error) {
        setError(error.response.statusText)
      }
    }
    getProfile()
  }, [userId])

  return (
    <>
      {profile ?
        <div className='page-container'>
          <h1>View my own collections...</h1>
          <div className='collection-wrapper'>
            {profile.created_collection ? 
              profile.created_collection.map(artwork => {
                const { added_on, caption, comments, id, image, likes, title, year_created } = artwork
                return (
                  <>
                  <ArtworkCard key={id} artwork={artwork} />
                  </>
                )
              })
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