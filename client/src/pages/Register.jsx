import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import CustomForm from '../subcomponents/CustomForm'
import { setToken } from '../lib/auth'


export default function Register() {

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
      name: 'email',
      type: 'email',
      placeholder: 'e.g. aesthete@email.com'
    },
    {
      name : 'username',
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
    {
      name: 'password_confirmation',
      type: 'password',
      placeholder: 'Repeat super secret password'
    }
  ]

  async function handleRegister(formData) {
    const { data: { access } } = await axios.post('/api/auth/register/', formData)
    setToken(access)
    navigate('/gallery')
  }

  return (
    <>
      <h1>Register here...</h1>
      <div className='register-form'>
        <h2>Join Us</h2>
        <CustomForm 
          request={handleRegister} 
          fields={fields} 
          submit='Welcome to the Gallery'
        />
        <p>Already joined? <NavLink to='/welcome-back'>Welcome back!</NavLink></p>
      </div>
    </>
  )
}