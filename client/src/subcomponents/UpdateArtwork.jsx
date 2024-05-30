import axios from 'axios'


export default function UpdateArtwork() {

  const fields = {
    title: {
      type: 'text',
      placeholder: 'What is this artwork called?'
    },
    image: {
      type: 'file',
      placeholder: 'Upload your beautiful work'
    },
    year_created: {
      type: 'number',
      placeholder: 'Enter the year it was made'
    },
    caption: 'text'
  }

  async function handleUpdateArtwork(formData) {
    try {
      await axios.put(`/api/artworks/${id}`, formData, {
        headers: {
          AUthorization: `Bearer ${getToken()}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  function loadFields() {
    return currentArtwork
  }

  return (
    <>
    </>
  )
}