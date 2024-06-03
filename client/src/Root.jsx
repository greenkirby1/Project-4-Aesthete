import { Outlet } from "react-router-dom"

import TopNavbar from "./subcomponents/TopNavbar"
import BottomNavbar from "./subcomponents/BottomNavbar"
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { getToken, getUserId } from './lib/auth'



export default function Root() {

  const [profile, setProfile] = useState()
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setUserId(getUserId)
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


  return(
    <>
      <TopNavbar profile={profile}/>
      <main>
        <Outlet context={[profile, userId, error]}/>
      </main>
      <BottomNavbar />
    </>
  )
}
