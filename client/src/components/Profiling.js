import { useFormik } from 'formik'
import React from 'react'
import NavBar from './NavBar'
import * as Yup from 'yup'

function Profiling({ user }) {
  const formik = useFormik({
    initialValues: {

    },
    validationSchema: Yup.object({

    }),
    onSubmit: () => console.log('submit')
  })



  return (
    <div>
      <NavBar user={user} color={true} />
      <div className="profiling">
        <h2>CREATE ACCOUNT</h2>
        <form>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input 
              id="first_name" 
              name="firstName" 
              type="text" 
              placeholder="First Name" 
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label>Date of Birth</label>
            <div className="multiple-input-container">
              <input 
                id="dob_day" 
                name="day" 
                type="number" 
                placeholder="DD" 
                value={formik.values.day}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <input 
                id="dob_month" 
                name="month" 
                type="number" 
                placeholder="MM" 
                value={formik.values.month}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <input 
                id="dob_year" 
                name="year" 
                type="number" 
                placeholder="YYYY" 
                value={formik.values.year}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input 
                id="man-gender-identity" 
                name="gender-identity" 
                type="radio" 
                value="man"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input 
                id="woman-gender-identity" 
                name="gender-identity" 
                type="radio" 
                value="woman"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input 
                id="more-gender-identity" 
                name="gender-identity" 
                type="radio" 
                value="more"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="showGender"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              checked={true}
            />

            <label>Show Me</label>
            <div className="multiple-input-container">
              <input 
                  id="man-gender-interest" 
                  name="gender-interest" 
                  type="radio" 
                  value="man"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <label htmlFor="man-gender-interest">Man</label>
                <input 
                  id="woman-gender-interest" 
                  name="gender-interest" 
                  type="radio" 
                  value="woman"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <label htmlFor="woman-gender-interest">Woman</label>
                <input 
                  id="everyone-gender-interest" 
                  name="gender-interest" 
                  type="radio" 
                  value="everyone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
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
              name="url"
              value={formik.values.url}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </section>
          

        </form>

      </div>

    </div>
  )
}

export default Profiling