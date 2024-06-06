import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../lib/auth'
import ReactCardFlip from 'react-card-flip'
import CustomForm from './CustomForm'
import { styles } from '../styles/inline'


export default function UpdateProfile({ profile, error, setProfile, setError }) {

  const [flipUpdateProfileCard, setFlipUpdateProfileCard] = useState(false)

  const navigate = useNavigate()

  const fields = [
    {
      name: 'first_name',
      type: 'text',
      placeholder: 'Art'
    },
    {
      name: 'last_name',
      type: 'text',
      placeholder: 'Afficiando'
    },
    {
      name: 'image',
      type: 'file',
      placeholder: 'Show yourself'
    },
    {
      name: 'username',
      type: 'text',
      placeholder: 'e.g. a_person_who_likes_art'
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'e.g. aesthete@email.com'
    },
    {
      name: 'is_artist',
      type: 'checkbox'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Create super secret password'
    },
    {
      name: 'facebook',
      type: 'url',
      placeholder: 'facebook.com/username'
    },
    {
      name: 'instagram',
      type: 'url',
      placeholder: 'instagram.com/username'
    },
    {
      name: 'twitter_x',
      type: 'url',
      placeholder: 'x.com/username'
    },
    {
      name: 'website',
      type: 'url',
      placeholder: 'your-website.com'
    }
  ]


  async function handleProfileUpdate(formData) {
    try {
      const { data } = await axios.put(`api/auth/profile/${profile.id}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      setProfile(data)
    } catch (error) {
      console.log(error)
    }
  }

  function loadFields() {
    return profile
  }

  return (
    <ReactCardFlip isFlipped={flipUpdateProfileCard}>
      {/* Card Front */}
      <div className='profile-content' style={styles.profileCard}>
        {/* <button onClick={handleHide}>❌</button> */}
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
              <img className='profile-img' src={profile.image} alt={profile.username} />
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
        <div className='btn-wrapper'>
          <button
            onClick={() => navigate('/my-collections')}
            className='update-profile-btn'
          >
            Back
          </button>
          <button
            onClick={() => setFlipUpdateProfileCard(!flipUpdateProfileCard)}
            className='update-profile-btn'
          >
            Change Details
          </button>
        </div>
      </div>
      {/* Card Back */}
      <div className='profile-form' style={styles.card}>
        <h1>Update Profile</h1>
        <CustomForm
          request={handleProfileUpdate}
          fields={fields}
          submit='Save Changes'
          onLoad={loadFields}
          flipUpdateProfileCard={flipUpdateProfileCard}
          setFlipUpdateProfileCard={setFlipUpdateProfileCard}
        />
        <button
          onClick={() => setFlipUpdateProfileCard(!flipUpdateProfileCard)}
          className='cancel-btn'
        >
          Cancel
        </button>
      </div>
    </ReactCardFlip>
  )
}