import { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth'

export default function MyCollections() {

  const [profile, setProfile] = useState()
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')

  async function getProfile() {
    try {
      const { data } = await axios.get(`/api/auth/profile/${userId}/`)
      setProfile(data)
    } catch (error) {
      setError(error.message)
    }
  }


  
  useEffect(() => {
    function getUserId() {
      const token = getToken()
      console.log(token)
    }
    getUserId()
  }, [])

  return (
    <>
      <h1>View my own collections...</h1>
    </>
  )
}