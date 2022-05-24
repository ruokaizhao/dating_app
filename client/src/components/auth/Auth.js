import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

function Auth({ setShowAuth, isSignUp, setUser, setIsSignUp, setIsForgettingPassword }) {

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
    if (isSignUp) {
      fetch('/api/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formik.values.email.toLocaleLowerCase(),
          password: formik.values.password,
          password_confirmation: formik.values.password2
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setUser(data)
            navigate('/onboarding')            
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
          email: formik.values.email.toLocaleLowerCase(),
          password: formik.values.password,
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setUser(data)
            navigate('/dashboard')
          })
        } else {
          r.json().then((errors) => formik.setErrors({password: errors.errors}))
        }
      })
    }
  }

  return (
    <div className="auth">
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

        {isSignUp 
        &&
        <input 
        type="password" 
        name="password2" 
        id="password2" 
        spellCheck="false"
        placeholder="Confirm your password..."
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur} 
        value={formik.values.password2} />}
        {formik.touched.password2 && formik.errors.password2 && <div className="errors">{formik.errors.password2}</div>}
        <button type="submit" className="secondary-button">Submit</button>
      </form>
      <div className="forgot-password-link">
        <p onClick={() => setIsSignUp((isSignUp) => !isSignUp)}>{isSignUp ? 'Already have an account?' : 'Don\' have an account?'}</p>
        <p onClick={() => setIsForgettingPassword(true)}>Forget your password?</p>
      </div>
      <hr/>
    </div>
  )
}

export default Auth