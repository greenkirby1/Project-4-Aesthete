import { useOutletContext } from 'react-router-dom'
import UpdateProfile from '../subcomponents/UpdateProfile'

export default function Profile() {

  const [profile, setProfile, error, setError] = useOutletContext()

  return (
    <div className='profile-page'>
      <UpdateProfile 
        profile={profile} 
        error={error} 
        setProfile={setProfile} 
        setError={setError}
      />
    </div>
  )
}