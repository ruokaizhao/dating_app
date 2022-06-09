import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../NavBar'

function ResetPassword({ setUser }) {
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const params = useParams()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
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
    fetch('/api/reset_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: params['token'],
        email: formik.values.email.toLocaleLowerCase(),
        password: formik.values.password,
        password_confirmation: formik.values.password2
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser(data.user)
          setIsPasswordReset(true)
          setTimeout(() => {
            navigate('/')
          }, 2000);
        })
      } else {
        r.json().then((errors) => formik.setErrors({password2: errors.errors}))
      }
    })
  }

  return (
    <div className="background">
      <div className="dim-layer">
        <NavBar user={{}} showAuth={true} color={false} />
      </div>
      <div className="reset-password">
        <h1>RESET PASSWORD</h1>

        {!isPasswordReset ?
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

          <input 
          type="password" 
          name="password" 
          id="password"
          spellCheck="false"
          placeholder="Enter your new password..." 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.password} 
          />
          {formik.touched.password && formik.errors.password && <div className="errors">{formik.errors.password}</div>}

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
          <button type="submit" className="secondary-button">Submit</button>
        </form> :
        <p>Your password has been reset.</p>}       
        <hr/>
      </div>      
    </div>     
  )
}

export default ResetPassword