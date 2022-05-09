import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function Auth({ setShowAuth }) {
  const isSignUp = true

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password2: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters'),
      password2: Yup.string().when('password', {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'Both password need to be the same'
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
      <p>By clicking Log In, you agree to our Terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
      <form onSubmit={formik.handleSubmit}>
        <input type='email' name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
        {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
        <input type='password' name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
        {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
        <input type='password' name='password2' id='password2' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password2} />
        {formik.touched.password2 && formik.errors.password2 && <div>{formik.errors.password2}</div>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Auth