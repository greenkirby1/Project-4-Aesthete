import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getToken, getUserId } from '../lib/auth'


export default function ArtistCollection() {

  const params = useParams()

  const [artistCollection, setArtistCollection] = useState()
  const [error, setError] = useState('')
  const [like, setLike] = useState('🤍')


  const sendLike = useCallback(async () => {
    try {
      await axios.patch(`/api/users/${params.username}/like/`, null, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      !artistCollection.likes.includes(getUserId) ? setLike('❤️') : setLike('🤍')
    } catch (error) {
      console.log(error)
    }
  }, [artistCollection, params.username, setLike])
  

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
            <h1>{artistCollection.username.toUpperCase()}&apos;s Collection</h1>
            <button onClick={sendLike}>{like}</button>
            {artistCollection.created_collection.length ?
              artistCollection.created_collection.map(artwork => {
                const { id, title, image, year_created, caption, added_on } = artwork
                return (
                  <img key={title} src={image} alt={title}/>
                )
              })
              :
              <h2>Unfortunately {params.username} has not created a collection yet.</h2>
            }
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