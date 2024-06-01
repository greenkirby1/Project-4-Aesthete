import axios from 'axios'


export default function UpdateProfile() {

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
      name: 'email',
      type: 'email',
      placeholder: 'e.g. aesthete@email.com'
    },
    {
      name: 'username',
      type: 'text',
      placeholder: 'e.g. a_person_who_likes_art'
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
    { name: 'image',
      type: 'file',
      placeholder: 'Show yourself'
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