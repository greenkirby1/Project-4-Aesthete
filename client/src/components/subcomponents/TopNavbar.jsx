import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isLoggedIn, removeToken } from '../../lib/auth'
import Directory from '../elements/Directory'


export default function TopNavbar({ profile, error }) {

  const location = useLocation()
  const navigate = useNavigate()

  const [show, setShow] = useState(false)

  useEffect(() => {

  }, [location])

  function handleLogOut() {
    removeToken()
    navigate('')
  }

  function handleShow() {
    console.log('showing')
    setShow(!show)
  }


  return (
    <>
      <header>

        {isLoggedIn ?
          <nav className='topnav'>
            <div className='nav-wrapper'>
              {location.pathname === '/gallery' ?
                <>
                  <button className='my-collections-btn' onClick={() => navigate('/my-collections')}>My Collections</button>
                  <button className='logout-btn' onClick={handleLogOut}>Exit Gallery</button>
                </>
                :
                location.pathname === '/my-collections' ?
                  <>
                    <div className='nav-btn-wrapper'>
                      <button className='profile-btn' onClick={() => navigate('/profile')}>View Profile</button>
                      {/* <button className='curated-btn'>Curated Collection</button> */}
                    </div>
                    <div className='nav-btn-wrapper'>
                      <button className='directory-btn' onClick={handleShow}>Directory</button>
                      <button className='logout-btn' onClick={handleLogOut}>Exit Gallery</button>
                    </div>
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
      </header>
      <Directory {...profile} show={show} handleShow={handleShow} />
      {/* <Modal
        isOpen={showProfile}
        onRequestClose={handleHide}
        contentLabel='Profile Modal'
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        <UpdateProfile profile={profile} error={error} handleHide={handleHide}/>
      </Modal> */}
    </>
  )
}