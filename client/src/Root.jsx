import { Outlet } from "react-router-dom"

import TopNavbar from './components/subcomponents/TopNavbar'
import BottomNavbar from './components/subcomponents/BottomNavbar'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { getToken, getUserId } from './lib/auth'
import { useLocation } from "react-router-dom"



export default function Root() {

  const location = useLocation()

  const [profile, setProfile] = useState()
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setUserId(getUserId())
  }, [])

  const getProfile = useCallback(async function () {
    try {
      console.log(userId)
      const { data } = await axios.get(`/api/auth/profile/${userId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      setProfile(data)
    } catch (error) {
      setError(error.response.statusText)
    }
  }, [setProfile, userId])

  useEffect(() => {
    if (userId) {
      getProfile()
    }
  }, [getProfile, userId])


  return (
    <>
      <TopNavbar profile={profile} error={error} />
      <main className={location.pathname === '/gallery' ? 'gallery-container' : ''}>
        <Outlet context={[profile, setProfile, userId, setUserId, error, setError, getProfile]} />
      </main>
      <BottomNavbar />
    </>
  )
}
