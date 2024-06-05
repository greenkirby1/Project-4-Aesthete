import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, FormGroup, FormLabel, FormControl, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function CustomForm({ 
  submit, 
  fields, 
  request, 
  onLoad, 
  flipArtworkCard, 
  setFlipArtworkCard,
  flipUpdateArtworkCard,
  setFlipUpdateArtworkCard,
  flipCreateArtworkCard,
  setFlipCreateArtworkCard,
  flipUpdateProfileCard,
  setFlipUpdateProfileCard
}) {

  // const fieldsReduced = Object.fromEntries(
  //   Object.entries(fields).map(([key, value]) => [key, value.type === 'multi' ? [] : ''])
  // )

  const fieldsReduced = Object.fromEntries(
    fields.map(field => {
      // console.log(field)
      const { name, type } = field
      return [name, type === 'multi' ? [] : '']
    })
  )



  const fieldsWithTitle = fields.map(field => {
    return {
      ...field,
      title: field.name.split('_').map(word => {
        return word !== 'is' ? word[0].toUpperCase() + word.slice(1) : ''
      }).join(' ')
    }
  })


  // * State
  const [formData, setFormData] = useState(fieldsReduced)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState()


  // * Cloudinary
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET
  const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL


  // * Event Handlers
  // ~ Handles form submission
  async function handleSubmit(e) {
    e.preventDefault()
    // console.log('submitting:', formData)
    if (setFlipArtworkCard && setFlipUpdateArtworkCard) {
      console.log('flip artwork')
      setFlipArtworkCard(!flipArtworkCard)
      setFlipUpdateArtworkCard(!flipUpdateArtworkCard)
    } else if (setFlipCreateArtworkCard) {
      console.log('flip create card')
      setFlipCreateArtworkCard(!flipCreateArtworkCard)
    } else if (setFlipUpdateProfileCard) {
      console.log('flip profile card')
      setFlipUpdateProfileCard(!flipUpdateProfileCard)
    }
    try {
      await request(formData)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
    }
  }

  // ~ Handles Changes in input and checkbox value conversion
  // function handleChange(name, e) {
  //   const { value } = e.target
  //   let parsedValue = value
  //   if (name === 'is_artist') {
  //     console.log(parsedValue)
  //     if (parsedValue === 'on') {
  //       parsedValue = true
  //     } else {
  //       parsedValue = false
  //     }
  //   }
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: parsedValue
  //   }))
  //   setError('')
  // }

  // ~ Handles file upload to Cloudinary
  async function handleUpload(e) {
    console.log('hit handle upload')
    const form = new FormData()
    form.append('file', e.target.files[0])
    form.append('upload_preset', uploadPreset)
    try {
      const { data } = await axios.post(uploadUrl, form)
      console.log(data)
      setFormData({ ...formData, image: data.secure_url })
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }

  // ~ Handles general form updates
  function handleTextChange(name, e) {
    const { value } = e.target
    setFormData({ ...formData, [name]: value })
    setError('')
  }

  // ~ Handles changes for multi-selects and updates data with values array
  function handleMultiChange(name, value) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value ? value.map(option => option.value) : [],
    }))
    setError('')
  }

  function handleCheck(name, e) {
    console.log(e.target.checked)
    if (e.target.type === 'checkbox') {
      setFormData({ ...formData, [name]: e.target.checked })
    }
  }

  // * Effect
  useEffect(() => {
    async function fillFields() {
      try {
        const data = await onLoad()
        setFormData(data)
      } catch (error) {
        // console.log(error.response)
        setErrors(error.response.data)
      }
    }
    if (onLoad) {
      fillFields()
    }
  }, [onLoad])


  return (
    <form onSubmit={handleSubmit}>
      <div>
        {formData && fieldsWithTitle.map(field => {
          const { name, type, placeholder, title } = field
          
          let value = formData[name] || ''

          return (
            <FormGroup key={name}>
              <FormLabel className='field-name'>{title}</FormLabel>

              {/* Image Upload */}
              {type === 'file' && (
                <FormControl
                  type={type}
                  name={name}
                  id={name}
                  onChange={handleUpload}
                />
              )}

              {/* Option Select */}
              {type === 'select' && (
                <FormControl
                  as="select"
                  name={name}
                  id={name}
                  value={value}
                  onChange={(e) => handleTextChange(name, e)}
                >
                  <option value=''>{title}</option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </FormControl>
              )}

              {/* Checkbox type */}
              {type === 'checkbox' && (
                <Form.Check
                  type={type}
                  id={name}
                  name={name}
                  onChange={(e) => handleCheck(name, e)}
                />
              )}

              {/* Multiple Option Select */}
              {type !== 'select' &&
                type !== 'multi' &&
                type !== 'file' &&
                type !== 'checkbox' && (
                  <FormControl
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name] || ''}
                    onChange={(e) => handleTextChange(name, e)}
                    placeholder={placeholder || name}
                  />
                )}
            </FormGroup>
          )
        })}
        {errors ?
          <ul>
            {Object.entries(errors).map(error => {
              const [field, [message]] = error
              // console.log(field, message)
              return (
                <li key={field}>{field}: {message}</li>
              )
            })}
          </ul>
          :
          error ?
            <p>{error}</p>
            :
            <></>
        }
        <button className='form-btn' type='submit'>{submit}</button>
      </div>
    </form>
  )
}