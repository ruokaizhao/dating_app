import { useFormik } from 'formik'
import React from 'react'
import NavBar from '../NavBar'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

function Onboarding({ user }) {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      first_name: '',
      dob_day: '',
      dob_month: '',
      dob_year: '',
      show_gender: false,
      gender_identity: '',
      gender_interest: '',
      url1: '',
      about: ''
    },
    validationSchema: Yup.object({

    }),
    onSubmit: () => handleSubmit()
  })

  function handleSubmit() {
    fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formik.values)
    })
    .then((r) => {
      if (r.ok) {
        r.json().then(() =>navigate('/dashboard'))
      }
    })
  }

  return (
    <div>
      <NavBar user={user} color={true} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={formik.handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input 
              id="first_name" 
              name="first_name" 
              type="text" 
              placeholder="First Name" 
              value={formik.values.first_name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label>Date of Birth</label>
            <div className="multiple-input-container">
              <input 
                id="dob_day" 
                name="dob_day" 
                type="number" 
                placeholder="DD" 
                value={formik.values.dob_day}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <input 
                id="dob_month" 
                name="dob_month" 
                type="number" 
                placeholder="MM" 
                value={formik.values.dob_month}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <input 
                id="dob_year" 
                name="dob_year" 
                type="number" 
                placeholder="YYYY" 
                value={formik.values.dob_year}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input 
                id="man-gender-identity" 
                name="gender_identity" 
                type="radio" 
                value="man"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.gender_identity === 'man'}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input 
                id="woman-gender-identity" 
                name="gender_identity" 
                type="radio" 
                value="woman"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.gender_identity === 'woman'}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input 
                id="more-gender-identity" 
                name="gender_identity" 
                type="radio" 
                value="more"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.gender_identity === 'more'}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <div className="show-gender">              
              <input
                id="show-gender"
                type="checkbox"
                name="show_gender"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.show_gender}
              />
              <label htmlFor="show-gender">Show gender on my profile</label>
            </div>            

            <label>Show Me</label>
            <div className="multiple-input-container">
              <input 
                  id="man-gender-interest" 
                  name="gender_interest" 
                  type="radio" 
                  value="man"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  checked={formik.values.gender_interest === 'man'}
                />
                <label htmlFor="man-gender-interest">Man</label>
                <input 
                  id="woman-gender-interest" 
                  name="gender_interest" 
                  type="radio" 
                  value="woman"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  checked={formik.values.gender_interest === 'woman'}
                />
                <label htmlFor="woman-gender-interest">Woman</label>
                <input 
                  id="everyone-gender-interest" 
                  name="gender_interest" 
                  type="radio" 
                  value="everyone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  checked={formik.values.gender_interest === 'everyone'}
                />
                <label htmlFor="everyone-gender-interest">Everyone</label>

                
            </div>  
            <label htmlFor="about">About Me</label>
                <input
                  id="about"
                  name="about"
                  type="text"
                  placeholder="Something about you..."
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.about}
              /> 
            <button type="submit">Submit</button>         
          </section>

          <section>
            <label>Profile Photo</label>
            <input
              id="url"
              type="url"
              name="url1"
              value={formik.values.url}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.values.url1 && <img className="profile-photo" src={formik.values.url1} alt="profile-photo" />}
            
            
          </section>
        </form>
      </div>
    </div>
  )
}

export default Onboarding