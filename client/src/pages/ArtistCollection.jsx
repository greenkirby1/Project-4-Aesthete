import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getToken } from '../lib/auth'


export default function ArtistCollection() {

  const params = useParams()

  const [artistCollection, setArtistCollection] = useState()
  const [error, setError] = useState('')
  const [like, setLike] = useState('🤍')


  async function sendLike() {
    try {
      const { data } = await axios.patch(`/api/users/${params.username}`)
    } catch (error) {
      console.log(error)
    }
  }


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
            <h1>{artistCollection.username.toUpperCase()}&apos; Collection</h1>
            <button>Like</button>
            {artistCollection.created_collection.length ?
              artistCollection.created_collection.map(artwork => {
                const { id, title, image, year_created, caption, added_on } = artwork
                return (
                  <img key={title} src={image} alt={title} />
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
      {/* <div>
        {artistCollection && artistCollection.created_collection.length ? 
          artistCollection.created_collection.map(artwork => {
            const { id, title, image, year_created, caption, added_on } = artwork
            return (
              <img key={title} src={image} alt={title} />
            )
          })
          :
          <>
            <h2>Unfortunately {params.username} has not created a collection yet.</h2>
          </>
        }
      </div> */}
    </>
  )
}