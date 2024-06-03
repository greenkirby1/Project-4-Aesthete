import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'
import { setToken } from '../lib/auth'
import CustomForm from '../subcomponents/CustomForm'


export default function Login() {

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
    navigate('/gallery')
  }

  return (
    <>
      <h1>Login here...</h1>
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