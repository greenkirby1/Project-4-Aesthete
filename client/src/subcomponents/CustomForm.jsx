import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function CustomForm({ submit, fields, request, onLoad }) {

  const fieldsReduced = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, value.type === 'multi' ? [] : ''])
  )

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
  function handleChange(fieldName, e) {
    const { value } = e.target
    let parsedValue = value
    if (fieldName === 'is_artist') {
      parsedValue = value === 'on' ? true : false
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: parsedValue
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
  function handleTextChange(fieldName, e) {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }))
  }

  // ~ Handles changes for multi-selects and updates data with values array
  function handleMultiChange(fieldName, value) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value ? value.map(option => option.value) : [],
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
        {Object.entries(fields).map(([fieldName, fieldData]) => {
          const capsFieldName = fieldName
            .split('_')
            .map(word => {
              if (word !== 'is') {
                return word.charAt(0).toUpperCase() + word.slice(1)
              }
            })
            .join(' ')

          let value = formData[fieldName] || ''
          // console.log(capsFieldName)
          return (
            <FormGroup key={fieldName}>
              <FormLabel className='field-name'>{capsFieldName}</FormLabel>

              {/* Image Upload */}
              {fieldData.type === 'file' && (
                <FormControl
                  type={fieldData.type}
                  name={fieldName}
                  id={fieldName}
                  onChange={handleUpload}
                />
              )}

              {/* Option Select */}
              {fieldData.type === 'select' && (
                <FormControl
                  as="select"
                  name={fieldName}
                  id={fieldName}
                  value={value}
                  onChange={(e) => handleChange(fieldName)(e)}
                >
                  <option value=''>{capsFieldName}</option>
                  {fieldData.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </FormControl>
              )}

              {/* Multiple Option Select */}
              {fieldData.type !== 'select' && fieldData.type !== 'multi' && fieldData.type !== 'file' && (
                <FormControl
                  type={fieldData.type}
                  id={fieldName}
                  name={fieldName}
                  value={formData[fieldName] || ''}
                  onChange={(e) => handleTextChange(fieldName, e)}
                  placeholder={fieldData.placeholder || fieldName}
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