import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

function ForgettingPassword({ setShowAuth, setIsForgettingPassword }) {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email address is not valid').required('Email is required')
    }),
    // onSubmit: () => handleSubmit()
  })

  function handleClick() {
    setIsForgettingPassword(false)
    setShowAuth(false)
  }

  // function handleSubmit() {
  //   if (isSignUp) {
  //     fetch('/api/signup', {
  //       method: "POST",
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         email: formik.values.email,
  //         password: formik.values.password,
  //         password_confirmation: formik.values.password2
  //       })
  //     })
  //     .then((r) => {
  //       if (r.ok) {
  //         r.json().then((data) => {
  //           setUser(data)
  //           navigate('/profiling')
  //         })
  //       }
  //     })
  //   } else {
  //     fetch('/api/login', {
  //       method: "POST",
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         email: formik.values.email,
  //         password: formik.values.password,
  //       })
  //     })
  //     .then((r) => {
  //       if (r.ok) {
  //         r.json().then((data) => {
  //           setUser(data)
  //           navigate('/dashboard')
  //         })
  //       }
  //     })
  //   }
  // }

  return (
    <div className="forget-password">
      <div className="close-icon" onClick={handleClick}>ⓧ</div>
      <h1>ENTER YOUR EMAIL</h1>
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
      <hr/>
    </div>
  )
}

export default ForgettingPassword