import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getToken, getUserId } from '../../lib/auth'


export default function ArtistCollection() {

  const params = useParams()

  const [artistCollection, setArtistCollection] = useState()
  const [error, setError] = useState('')
  const [like, setLike] = useState('🤍')


  const sendLike = useCallback(async () => {
    try {
      const { status } = await axios.patch(`/api/users/${params.username}/like/`, null, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      if (status === 201) {
        setLike('❤️')
      } else {
        setLike('🤍')
      }
      console.log(status)
    } catch (error) {
      console.log(error)
    }
  }, [params.username])


  useEffect(() => {
    async function getArtistCollection() {
      try {
        const { data } = await axios.get(`/api/users/${params.username}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        setArtistCollection(data)
      } catch (error) {
        setError(error.message)
      }
    }
    getArtistCollection()
  }, [params.username])

  return (
    <>
      <div className='artist-page'>
        {artistCollection ? (
          <>
          <div className='artist-page-top'>
            <h1>{artistCollection.username}&apos;s Collection</h1>
            <button onClick={sendLike}>{like}</button>
          </div>
            <div className='artist-page-wrapper'>
            {artistCollection.created_collection.length ? (
              <>
                {artistCollection.created_collection.map(artwork => {
                  const { id, title, image, year_created, caption, added_on } = artwork
                  return (
                    <div key={title} className='artwork-img'>
                      <img src={image} alt={title} />
                    </div>
                  )
                })
                }
              </>
              )
              :
              <h2>Unfortunately {params.username} has not created a collection.</h2>
            }
            </div>
          </>
        )
          :
          error ?
            <h2>{error}</h2>
            :
            <h2>Loading...</h2>
        }
      </div>
    </>
  )
}