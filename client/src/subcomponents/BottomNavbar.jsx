import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { isLoggedIn } from '../../lib/auth'


export default function BottomNavbar() {

  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  const [search, setSearch] = useState('')

  useEffect(() => {

  }, [location])

  async function handleSearch() {
    navigate(`gallery/${search}`)
  }

  function handleChange(e) {
    setSearch(e.target.value)
  }

  return (
    <>
      {isLoggedIn ?
        <nav className='topnav'>
          <div>
            {location.pathname === '/gallery' ?
              <>
                <button className='help-btn'>Help</button>
                <form>
                  <input 
                    name='search' 
                    type="text" 
                    placeholder='Search Artist...' 
                    onChange={handleChange}
                    value={search}
                  />
                  <button type='button' onClick={handleSearch}>Go</button>
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