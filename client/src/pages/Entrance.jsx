import { Link, useNavigate } from 'react-router-dom'


export default function Entrance() {

  const navigate = useNavigate()

  function handleClick(e){
    if (e.target.className === 'register') {
      navigate('/join-us')
    } else if (e.target.className === 'login') {
      navigate('/welcome-back')
    }
  }

  return (
    <>
      <h1>Come on in...</h1>
      <button className='register' onClick={handleClick}>Join Us</button>
      <button className='login' onClick={handleClick}>Welcome Back</button>
    </>
  )
}