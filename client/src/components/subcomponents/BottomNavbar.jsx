import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { isLoggedIn } from '../../lib/auth'
import Modal from 'react-modal'
import { styles } from '../../styles/inline'

export default function BottomNavbar() {

  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)

  function handleShow() {
    setShow(!show)
  }

  useEffect(() => {

  }, [location])

  async function handleSearch() {
    navigate(`gallery/${search}`)
  }

  function handleChange(e) {
    setSearch(e.target.value)
  }

  function handleExit() {
    navigate('/gallery')
    setSearch('')
  }

  return (
    <>
      <footer>

        {isLoggedIn ?
          <nav className='bottomnav'>
            <div className='nav-wrapper'>
              {location.pathname === '/gallery' ?
                <>
                  <button className='help-btn' onClick={handleShow}>Help</button>
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
                  location.pathname === `/gallery/${params.username}` ?
                    <>
                      <button className='back-btn' onClick={() => handleExit()}>Back to Gallery</button>
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
      </footer>
      < Modal
        isOpen={show}
        onRequestClose={handleShow}
        style={styles.modal}
        contentLabel='Help Modal'
        shouldCloseOnOverlayClick={false}
      >
          <h4>Help</h4>
          <button className='help-close-btn' onClick={handleShow}>X</button>
          <h5>How to walk through the gallery?</h5>
          <p>To peruse this gallery full of unique works, <span>scroll</span> with your mouse to move <span>left</span> and <span>right</span> through the gallery.
            If you would like to view the informtaion about the artwork you&apos;re looking at,
            simply click on the info card to the right.</p>
          <h5>Where to view your collections?</h5>
          <p>Just click <span>My Collections</span> on your top left.</p>
          <h5>Can I search for my favourite artists?</h5>
          <p>Type in the username of your favourite artist in the <span>search bar</span> on the bottom.You will even be able to save them to your directory once you land on their collection page!</p>
      </Modal>
    </>
  )
}