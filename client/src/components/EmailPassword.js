import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function EmailPassword({ user, setUser }) {
  const [emailOrPassword, setEmailOrPassword] = useState(0)
  const [successMessage, setSuccessMessage] = useState(null)

  const formik = useFormik({
    initialValues: {
      email: user.email || '',
      currentPassword: '',
      password: '',
      password2: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email address is not valid').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters'),
      password2: Yup.string().when('password', {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'Passwords need to match'
        )
      })
    }),
    onSubmit: () => handleSubmit()
  })

  function handleSubmit() {
    if (emailOrPassword === 1) {
      fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formik.values.email.toLocaleLowerCase()
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setUser(data)
            setEmailOrPassword(0)
            setSuccessMessage('Your email address has been successfully changed.')
            setTimeout(() => {
              setSuccessMessage(null)
            }, 2000);
          })
        }
      })
    } else {
      fetch('/api/change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: user.id,
          current_password: formik.values.currentPassword,
          password: formik.values.password,
          password_confirmation: formik.values.password2
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setUser(data)
            setEmailOrPassword(0)
            setSuccessMessage('Your password has been successfully changed.')
            setTimeout(() => {
              setSuccessMessage(null)
            }, 2000);            
          })
        } else {
          r.json().then((errors) => formik.setErrors({currentPassword: errors.errors}))
        }
      })
    }
  }

  return (
    <div className="email-password">
      <div className="email-password-email">
        <h4>Email:</h4>
        <h4>{user.email}</h4>
      </div>
      <div className="email-password-option">
        <button onClick={() => setEmailOrPassword(1)}>Change Email</button>
        <button onClick={() => setEmailOrPassword(2)}>Change Password</button>
      </div>
      <h2>{successMessage}</h2>

      
      {emailOrPassword === 1 &&
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Enter your new email address:</label>
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
        <button type="submit">Submit</button>
      </form>
      }
      
      {emailOrPassword === 2 &&
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="current-password">Enter your current password:</label>
        <input 
        type="password" 
        name="currentPassword" 
        id="current-password"
        spellCheck="false"
        placeholder="Enter your password..." 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur} 
        value={formik.values.currentPassword} 
        />
        {formik.touched.currentPassword && formik.errors.currentPassword && <div className="errors">{formik.errors.currentPassword}</div>}

        <label htmlFor="password">Enter your new password:</label>
        <input 
        type="password" 
        name="password" 
        id="password"
        spellCheck="false"
        placeholder="Enter your password..." 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur} 
        value={formik.values.password} 
        />
        {formik.touched.password && formik.errors.password && <div className="errors">{formik.errors.password}</div>}

        <label htmlFor="password2">Confirm your new password:</label>
        <input 
        type="password" 
        name="password2" 
        id="password2" 
        spellCheck="false"
        placeholder="Confirm your password..."
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur} 
        value={formik.values.password2} />
        {formik.touched.password2 && formik.errors.password2 && <div className="errors">{formik.errors.password2}</div>}
        <button type="submit">Submit</button>
      </form>
      }      
    </div>
  )
}

export default EmailPassword