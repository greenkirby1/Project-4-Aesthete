import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import { ModalHeader, ModalTitle, ModalBody } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Directory({ liked_artists, show, handleShow }) {

  const navigate = useNavigate()

  console.log(liked_artists)

  return (
    <>
      <Modal
        show={show} 
        onHide={handleShow}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <ModalHeader closeButton>
          <ModalTitle>Gallery Directory</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <ul>
            {liked_artists.length > 0 ?
              liked_artists.map(artist => {
                const { id, username, image } = artist
                return (
                  <li key={username}>
                    <img src={image} alt={username} />
                    <NavLink to={`/gallery/${username}`}>{username}</NavLink>
                  </li>
                )
              })
              :
              <h2>You haven&apos;t liked any artists...</h2>
            }
          </ul>
        </ModalBody>
      </Modal>
    </>
  )
}