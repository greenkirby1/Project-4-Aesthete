import axios from 'axios'


export default function UpdateProfile() {

  const fields = {
    first_name: {
      type: 'text',
      placeholder: 'Art'
    },
    last_name: {
      type: 'text',
      placeholder: 'Afficiando'
    },
    email: {
      type: 'email',
      placeholder: 'e.g. aesthete@email.com'
    },
    username: {
      type: 'text',
      placeholder: 'e.g. a_person_who_likes_art'
    },
    is_artist: 'checkbox',
    password: {
      type: 'password',
      placeholder: 'Create super secret password'
    },
    image: {
      type: 'file',
      placeholder: 'Show yourself'
    },
    facebook: 'url',
    instagram: 'url',
    twitter_x: 'url',
    website: 'url'
  }


  async function handleProfileUpdate(formData) {
    try {
      await axios.put(`api/auth/profile/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  function loadFields() {
    return currentUserProfile
  }

  return (
    <>
    </>
  )
}