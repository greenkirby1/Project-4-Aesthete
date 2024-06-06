import axios from 'axios'
import { useNavigate, NavLink, useOutletContext } from 'react-router-dom'
import { setToken } from '../../lib/auth'
import CustomForm from '../subcomponents/CustomForm'
import { getUserId } from '../../lib/auth'


export default function Login() {

  const [profile, setProfile, userId, setUserId, error, setError] = useOutletContext()

  const navigate = useNavigate()

  const fields = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Enter unique username'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter super secret password'
    }
  ]

  async function handleLogin(formData) {
    const { data: { access } } = await axios.post('/api/auth/login/', formData)
    setToken(access)
    setUserId(getUserId())
    navigate('/gallery')
  }

  return (
    <>
      <div className='login-form'>
        <div className='form-container'>
          <h1>Welcome Back</h1>
          <CustomForm
            request={handleLogin}
            fields={fields}
            submit='Enter the Gallery'
          />
          <p>Haven&apos;t joined? <NavLink to='/join-us'>Join us here!</NavLink></p>
        </div>
      </div>
    </>
  )
}