import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function Auth({ setShowAuth, isSignUp }) {

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
          'Password need to match'
        )
      })
    }),
    onSubmit: () => handleSubmit()
  })

  function handleSubmit() {
    console.log(formik.values)
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
        autoFocus
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur} 
        value={formik.values.email} 
        />
        {formik.touched.email && formik.errors.email && <div className="errors">{formik.errors.email}</div>}

        <input 
        type="password" 
        name="password" 
        id="password" 
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
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur} 
        value={formik.values.password2} />}
        {formik.touched.password2 && formik.errors.password2 && <div className="errors">{formik.errors.password2}</div>}
        <button type="submit" className="secondary-button">Submit</button>
      </form>
      <hr/>
      <h2>GET THE APP</h2>
    </div>
  )
}

export default Auth