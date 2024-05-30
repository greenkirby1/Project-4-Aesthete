import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


export default function TopNavbar() {

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {

  }, [location])

  return (
    <>
      <nav className='topnav'>
        <ul>

        </ul>
      </nav>
    </>
  )
}