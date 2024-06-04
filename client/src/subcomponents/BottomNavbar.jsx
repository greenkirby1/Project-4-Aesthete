import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { isLoggedIn } from '../lib/auth'
import Modal from 'react-bootstrap/Modal'
import { ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'


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
        show={show}
        onHide={handleShow}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <ModalTitle>Help</ModalTitle>
        </Modal.Header>
        <ModalBody>
          <p>To peruse this gallery full of unique works, created by even more unique individuals,
            press the LEFT and RIGHT key to move through the gallery.
            If you would like to look more closely at one of tme,
            simply click on the framed work to zoom in.</p>
        </ModalBody>
      </Modal>
    </>
  )
}