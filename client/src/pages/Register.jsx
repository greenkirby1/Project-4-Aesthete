import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Register() {

  const naviate = useNavigate()

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
    passwordConfirmation: {
      type: 'password',
      placeholder: 'Repeat super secret password'
    }
  }

  async function handleRegister(formData) {
    await axios.post('/api/auth/register', formData)
    Navigate('/gallery')
  }

  return (
    <>
      <h1>Register here...</h1>
    </>
  )
}