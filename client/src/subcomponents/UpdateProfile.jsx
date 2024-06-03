import { useState } from 'react'
import axios from 'axios'
import { getToken } from '../lib/auth'
import ReactCardFlip from 'react-card-flip'
import CustomForm from './CustomForm'


export default function UpdateProfile({ profile, error, handleHide }) {

  const [flipUpdateProfileCard, setFlipUpdateProfileCard] = useState(false)

  const fields = [
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
      type: 'url'
    },
    {
      name: 'instagram',
      type: 'url'
    },
    {
      name: 'twitter_x',
      type: 'url'
    },
    {
      name: 'website',
      type: 'url'
    }
  ]


  async function handleProfileUpdate(formData) {
    try {
      await axios.put(`api/auth/profile/${profile.id}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  function loadFields() {
    return profile
  }

  return (
    <ReactCardFlip>
      {/* Card Front */}
      <div className='profile-content'>
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
        <button
          onClick={() => setFlipUpdateProfileCard(!flipUpdateProfileCard)} 
          className='update-profile-btn'
        >
          Change Details
        </button>
      </div>
      {/* Card Back */}
      <div>
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