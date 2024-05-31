import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { isLoggedIn } from '../../lib/auth'


export default function BottomNavbar() {

  const location = useLocation()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')

  useEffect(() => {

  }, [location])

  async function handleSearch() {
    try {
      const { data } = await axios.get(`/api/users/${search}`)
    } catch (error) {
      console.log
    }
  }

  function handleChange() {

  }

  return (
    <>
      {isLoggedIn ?
        <nav className='topnav'>
          <div>
            {location.pathname === '/gallery' ?
              <>
                <button className='help-btn'>Help</button>
                <form onSubmit={handleSearch}>
                  <input 
                    name='search' 
                    type="text" 
                    placeholder='Search Artist...' 
                    onChange={handleChange}
                    value={search}
                  />
                  <button type='submit'>Go</button>
                </form>
              </>
              :
              location.pathname === '/my-collections' ?
                <>
                  <button className='back-btn' onClick={() => navigate('/gallery')}>Back to Gallery</button>
                </>
                :
                location.pathname === '/gallery/:username' ?
                  <>
                    <button className='back-btn' onClick={() => navigate('/gallery')}>Back to Gallery</button>
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