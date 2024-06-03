import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getToken } from '../lib/auth'


export default function ArtistCollection() {

  const params = useParams()

  const [artistCollection, setArtistColelction] = useState()
  const [error, setError] = useState('')

  useEffect(() => {
    async function getArtistCollection() {
      try {
        const { data } = await axios.get(`/api/users/${params.username}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        setArtistColelction(data)
      } catch (error) {
        setError(error.message)
      }
    }
    getArtistCollection()
  }, [params.username])

  return (
    <>
      <h1>View artist collection...</h1>
      <div>
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
      </div>
    </>
  )
}