import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

function ForgettingPassword({ setShowAuth, isSignUp, setUser, setIsSignUp }) {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email address is not valid').required('Email is required')
    }),
    onSubmit: () => handleSubmit()
  })

  function handleSubmit() {
    if (isSignUp) {
      fetch('/api/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formik.values.email,
          password: formik.values.password,
          password_confirmation: formik.values.password2
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setUser(data)
            navigate('/profiling')
          })
        }
      })
    } else {
      fetch('/api/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formik.values.email,
          password: formik.values.password,
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setUser(data)
            navigate('/dashboard')
          })
        }
      })
    }
  }

  return (
    <div className="forget-password">
      <div className="close-icon" onClick={() => setShowAuth(false)}>ⓧ</div>
      <h1>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h1>
      <p>By clicking Submit, you agree to our Terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>

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
      </form>
      <hr/>
    </div>
  )
}

export default ForgettingPassword