import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, FormGroup, FormLabel, FormControl, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function CustomForm({ submit, fields, request, onLoad }) {

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


  // * Cloudinary
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET
  const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL


  // * Event Handlers
  // ~ Handles form submission
  async function handleSubmit(e) {
    e.preventDefault()
    console.log('submitting:', formData)
    try {
      await request(formData)
    } catch (error) {
      setError(error.response.data)
    }
  }

  // ~ Handles Changes in input and checkbox value conversion
  function handleChange(name, e) {
    const { value } = e.target
    let parsedValue = value
    if (name === 'is_artist') {
      console.log(parsedValue)
      if (parsedValue === 'on') {
        parsedValue = true
      } else {
        parsedValue = false
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue
    }))
    setError('')
  }

  // ~ Handles file upload to Clodinary
  async function handleUpload(e) {
    console.log('hit handle upload')
    const form = new FormData()
    form.append('file', e.target.files[0])
    form.append('upload_preset', uploadPreset)
    try {
      const { data } = await axios.post(uploadUrl, form)
      setFormData({ ...formData, image: data.secure_url })
    } catch (error) {
      setError(error.message)
    }
  }

  // ~ Handles general form updates
  function handleTextChange(name, e) {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  // ~ Handles changes for multi-selects and updates data with values array
  function handleMultiChange(name, value) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value ? value.map(option => option.value) : [],
    }))
    setError('')
  }

  // * Effect
  useEffect(() => {
    async function fillFields() {
      try {
        const data = await onLoad()
        setFormData(data)
      } catch (error) {
        setError(error.response.data)
      }
    }
    if (onLoad) {
      fillFields()
    }
  }, [onLoad])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {fieldsWithTitle.map(field => {
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
                  onChange={(e) => handleChange(name, e)}
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
                  onChange={(e) => handleChange(name, e)}
                />
              )}

              {/* Multiple Option Select */}
              {type !== ('select' && 'multi' && 'file' && 'checkbox') && (
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
        <button className='form-btn' type='submit'>{submit}</button>
      </div>
    </form>
  )
}