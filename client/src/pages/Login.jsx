import axios from 'axios'
import { useNavigate, NavLink, useOutletContext } from 'react-router-dom'
import { setToken } from '../lib/auth'
import CustomForm from '../subcomponents/CustomForm'
import { getUserId } from '../lib/auth'


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
    console.log('before')
    setUserId(getUserId())
    console.log('after')
    navigate('/gallery')
  }

  return (
    <>
      <div className='login-form'>
        <h2>Welcome Back</h2>
        <CustomForm
          request={handleLogin}
          fields={fields}
          submit='Enter the Gallery'
        />
        <p>Haven&apos;t joined? <NavLink to='/join-us'>Join us here!</NavLink></p>
      </div>
    </>
  )
}