import axios from 'axios'


export default function UpdateArtwork() {

  const fields = [
    {
      name: 'title',
      type: 'text',
      placeholder: 'What is this artwork called?'
    },
    {
      name: 'image',
      type: 'file',
      placeholder: 'Upload your beautiful work'
    },
    {
      name: 'year_created',
      type: 'number',
      placeholder: 'Enter the year it was made'
    },
    {
      name: 'caption',
      type: 'text',
      placeholder: 'What is your artwork about?'
    }
  ]

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