import { useOutletContext } from 'react-router-dom'
import UpdateProfile from '../subcomponents/UpdateProfile'

export default function Profile() {

  const [profile, error] = useOutletContext()

  return (
    <div className='profile-page'>
      <UpdateProfile profile={profile} error={error}/>
    </div>
  )
}