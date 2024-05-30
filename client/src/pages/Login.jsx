import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Login() {

  const navigate = useNavigate()

  const fields = {
    username: 'username',
    password: {
      type: 'password',
      placeholder: 'Enter super secret password'
    }
  }

  async function handleLogin(formData) {
    const { data } = await axios.post('/api/auth/login', formData)
    navigate('/gallery')
  }

  return (
    <>
      <h1>Login here...</h1>
    </>
  )
}