import { useState, useEffect } from 'react'
import axios from 'axios'


export default function Form({ submit, fields, request, onLoad }) {

  // * State
  const [formData, setFormData] = useState()
  const [error, setError] = useState('')

  // * Event Handlers
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await request(formData)
    } catch (error) {
      setError(error.response.data)
    }
  }

  function handleChange(fieldName, e) {
    const { value } = e .target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value
    }))
  }


  return (
    <>
    </>
  )
}