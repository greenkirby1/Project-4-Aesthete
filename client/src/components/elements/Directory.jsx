import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

export default function Directory({ liked_artists, show, handleShow }) {

  const navigate = useNavigate()

  const styles = {
    modal: {
      content: {
        color: 'black',
        fontFamily: 'Phosphene Reg',
        margin: '30px 60px',
      },
      overlay: {
        zIndex: 2,
      }
    }
  }


  return (
    <>
      <Modal
        isOpen={show}
        onRequestClose={handleShow}
        style={styles.modal}
        contentLabel='Directory Modal'
        shouldCloseOnOverlayClick={false}
      >
        <div className='modal-wrapper'>
          <h2>Gallery Directory</h2>
          <button onClick={handleShow}>X</button>
        </div>
        <ul className='directory-list'>
          {liked_artists && liked_artists.length > 0 ?
            liked_artists.map(artist => {
              const { id, username, image } = artist
              return (
                <li key={username}>
                  <img src={image} alt={username} />
                  <NavLink 
                    to={`/gallery/${username}`}
                    onClick={handleShow}
                  >
                    {username}
                  </NavLink>
                </li>
              )
            })
            :
            <h2>You haven&apos;t liked any artists...</h2>
          }
        </ul>
      </Modal>
    </>
  )
}