import { useNavigate, NavLink, useOutletContext } from 'react-router-dom'
import axios from 'axios'
import CustomForm from '../subcomponents/CustomForm'
import { getUserId, setToken } from '../lib/auth'


export default function Register() {

  const [profile, setProfile, userId, setUserId, error, setError, getProfile] = useOutletContext()

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
    {
      name: 'password_confirmation',
      type: 'password',
      placeholder: 'Repeat super secret password'
    }
  ]

  async function handleRegister(formData) {
    const { data: { access } } = await axios.post('/api/auth/register/', formData)
    setToken(access)
    setUserId(getUserId())
    navigate('/gallery')
  }

  return (
    <>
      <div className='register-form'>
        <div className='form-container'>
          <h1>Join Us</h1>
          <CustomForm
            request={handleRegister}
            fields={fields}
            submit='Welcome to the Gallery'
          />
          <p>Already joined? <NavLink to='/welcome-back'>Welcome back!</NavLink></p>
        </div>
      </div>
    </>
  )
}