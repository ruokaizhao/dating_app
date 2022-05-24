import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function ForgetPassword({ setShowAuth, setIsForgettingPassword }) {
  const [isResettingEmailSent, setIsResettingEmailSent] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email address is not valid').required('Email is required')
    }),
    onSubmit: () => handleSubmit()
  })

  function handleClick() {
    setIsForgettingPassword(false)
    setShowAuth(false)
  }

  function handleSubmit() {
    fetch('/api/forgot_password', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email: formik.values.email.toLocaleLowerCase()
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then(() => setIsResettingEmailSent(true))
      } else {
        r.json().then((errors) => formik.setErrors({email: errors.errors}))
      }
    })
  }

  return (
    <div className="forget-password">
      <div className="close-icon" onClick={handleClick}>ⓧ</div>
      <h1>ENTER YOUR EMAIL</h1>
      {!isResettingEmailSent ?
      <>
        <form onSubmit={formik.handleSubmit}>
          <input 
          type="email" 
          name="email" 
          id="email" 
          spellCheck="false"
          placeholder="Enter your email address..."
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.email} 
          />
          {formik.touched.email && formik.errors.email && <div className="errors">{formik.errors.email}</div>}
          <button type="submit" className="secondary-button">Submit</button>
        </form>
      </> :
      <p>An email has been sent to your email address, please follow the instruction to reset your password.</p>}  
      <hr/>    
    </div>
  )
}

export default ForgetPassword