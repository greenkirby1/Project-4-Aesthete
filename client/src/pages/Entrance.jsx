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
    <div className='entrance-page'>
      <button className='register' onClick={handleClick} value='Join Us'></button>
      <button className='login' onClick={handleClick} value='Welcome Back'></button>
    </div>
    </>
  )
}