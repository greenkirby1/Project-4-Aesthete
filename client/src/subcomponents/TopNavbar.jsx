import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { isLoggedIn, removeToken } from '../lib/auth'


export default function TopNavbar() {

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {

  }, [location])

  function handleLogOut() {
    removeToken()
    navigate('')
  }

  return (
    <>
      {isLoggedIn ?
        <nav className='topnav'>
          <div>
            {location.pathname === '/gallery' ?
              <>
                <button className='my-collections-btn' onClick={() => navigate('/my-collections')}>My Collections</button>
                <button className='logout-btn' onClick={handleLogOut}>Exit Gallery</button>
              </>
              :
              location.pathname === '/my-collections' ?
                <>
                  <button className='profile-btn'>View Profile</button>
                  <button className='curated-btn'>Curated Collection</button>
                  <button className='logou-btn' onClick={handleLogOut}>Exit Gallery</button>
                </>
                :
                <>
                </>
            }
          </div>
        </nav>
        :
        <>
        </>
      }
    </>
  )
}