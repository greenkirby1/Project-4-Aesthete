import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isLoggedIn, removeToken } from '../lib/auth'
// import Modal from 'react-bootstrap/Modal'
// import { ModalHeader, ModalTitle, ModalBody } from 'react-bootstrap'
import Modal from 'react-modal'
import UpdateProfile from './UpdateProfile'


export default function TopNavbar({ profile, error }) {

  const location = useLocation()
  const navigate = useNavigate()

  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {

  }, [location])

  function handleLogOut() {
    removeToken()
    navigate('')
  }

  function handleShow() {
    console.log('showing')
    setShowProfile(true)
  }

  function handleHide() {
    console.log('closing')
    setShowProfile(false)
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
                  <button className='profile-btn' onClick={handleShow}>View Profile</button>
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
      <Modal
        isOpen={showProfile}
        onRequestClose={handleHide}
        contentLabel='Profile Modal'
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        {/* <div className='profile-content'>
          <button onClick={handleHide}>❌</button>
          {profile ?
            <>
              <h4>
                {profile.is_artist ?
                  `Artist Profile`
                  :
                  `Gallery Pass`
                }
              </h4>
              <div className='profile-wrapper-one'>
                <img src={profile.image} alt={profile.username} />
                <div className='info-wrapper'>
                  <dl>
                    <dt>Full Name:</dt>
                    <dd>{profile.first_name} {profile.last_name}</dd>
                    <dt>Username:</dt>
                    <dd>{profile.username}</dd>
                    <dt>Email:</dt>
                    <dd>{profile.email}</dd>
                  </dl>
                </div>
              </div>
              <div className='profile-wrapper-two'>
                {profile.instagram ?
                  <>
                    <dt>Instagram:</dt>
                    <dd><a href={profile.instagram} target='_blank'>{profile.instagram}</a></dd>
                  </>
                  :
                  <></>
                }
                {profile.twitter_x ?
                  <>
                    <dt>X:</dt>
                    <dd><a href={profile.twitter_x} target='_blank'>{profile.twitter_x}</a></dd>
                  </>
                  :
                  <></>
                }
                {profile.facebook ?
                  <>
                    <dt>FaceBook:</dt>
                    <dd><a href={profile.facebook} target='_blank'>{profile.facebook}</a></dd>
                  </>
                  :
                  <></>
                }
                {profile.website ?
                  <>
                    <dt>Website:</dt>
                    <dd><a href={profile.website} target='_blank'>{profile.website}</a></dd>
                  </>
                  :
                  <></>
                }
              </div>
            </>
            :
            error ?
              <h4>{error}</h4>
              :
              <h4>Loading...</h4>
          }

        </div> */}
        <UpdateProfile profile={profile} error={error} handleHide={handleHide}/>
      </Modal>
    </>
  )
}