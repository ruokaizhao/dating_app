import { useFormik } from 'formik'
import React from 'react'
import NavBar from './NavBar'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

function Onboarding({ user, showAuth, isEditingProfile, setUser }) {
  const navigate = useNavigate()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: user.first_name || '',
      dob_day: user.dob_day || '',
      dob_month: user.dob_month || '',
      dob_year: user.dob_year || '',
      show_gender: user.show_gender || false,
      gender_identity: user.gender_identity || '',
      show_sexual_orientation: user.show_sexual_orientation || false,
      sexual_orientation: user.sexual_orientation || '',
      gender_interest: user.gender_interest || '',
      url1: user.url1 || '',
      about: user.about || ''
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('Name is required'),
      dob_day: Yup.number().min(1, 'Day must be greater than 1').max(31, 'Day must be smaller than 31').required('Day is required'),
      dob_month: Yup.number().min(1, 'Day must be greater than 1').max(12, 'Month must be smaller than 12').required('Month is required'),
      dob_year: Yup.number().min(1900, 'Day must be greater than 1900').max(2020, 'Day must be smaller than 2020').required('Year is required'),
      show_gender: Yup.boolean().required('Show gender is required'),
      gender_identity: Yup.string().required('Gender identity is required'),
      show_sexual_orientation: Yup.boolean().required('Show sexual orientation is required'),
      sexual_orientation: Yup.string().required('Sexual orientation is required'),
      gender_interest: Yup.string().required('Gender interest is required'),
      url1: Yup.string().url('The filed must contain a valid URL').required('Photo url is required'),
      about: Yup.string().required('The field is required'),
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
        if (isEditingProfile) {
          r.json().then((data) => {
            setUser(data)
            navigate('/account')
          })
        } else {
          r.json().then((data) => {
            setUser(data)
            navigate('/dashboard')
          })
        }       
      }
    })
  }

  return (
    <div>
      <NavBar user={user} color={true} showAuth={showAuth} setUser={setUser} />
      <div className="onboarding">
        <h2>{isEditingProfile ? 'EDIT PROFILE' : 'CREATE ACCOUNT'}</h2>
        <form onSubmit={formik.handleSubmit}>
          <section>
            <label>Profile Photo</label>
            <input
              id="url"
              type="url"
              name="url1"
              value={formik.values.url1}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.url1 && formik.errors.url1 && <div className="errors">{formik.errors.url1}</div>}
            {formik.values.url1 && <img className="profile-photo" src={formik.values.url1} alt="" />}            
          </section>
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
            {formik.touched.first_name && formik.errors.first_name && <div className="errors">{formik.errors.first_name}</div>}
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
            {formik.touched.dob_day && formik.errors.dob_day && <div className="errors">{formik.errors.dob_day}</div>}
            {formik.touched.dob_month && formik.errors.dob_month && <div className="errors">{formik.errors.dob_month}</div>}
            {formik.touched.dob_year && formik.errors.dob_year && <div className="errors">{formik.errors.dob_year}</div>}

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
            </div>
            {formik.touched.gender_identity && formik.errors.gender_identity && <div className="errors">{formik.errors.gender_identity}</div>}

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
            {formik.touched.show_gender && formik.errors.show_gender && <div className="errors">{formik.errors.show_gender}</div>} 

            <label>Sexual Orientation</label>
            <div className="multiple-input-container sexual-orientation">
              <input 
                id="straight-sexual-orientation" 
                name="sexual_orientation" 
                type="radio" 
                value="straight"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.sexual_orientation === 'straight'}
              />
              <label htmlFor="straight-sexual-orientation">Straight</label>
              <input 
                id="gay-sexual-orientation" 
                name="sexual_orientation" 
                type="radio" 
                value="gay"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.sexual_orientation === 'gay'}
              />
              <label htmlFor="gay-sexual-orientation">Gay</label>
              <input 
                id="lesbian-sexual-orientation" 
                name="sexual_orientation" 
                type="radio" 
                value="lesbian"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.sexual_orientation === 'lesbian'}
              />
              <label htmlFor="lesbian-sexual-orientation">Lesbian</label>    
              <input 
                id="bisexual-sexual-orientation" 
                name="sexual_orientation" 
                type="radio" 
                value="bisexual"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.sexual_orientation === 'bisexual'}
              />
              <label htmlFor="bisexual-sexual-orientation">Bisexual</label>
              <input 
                id="asexual-sexual-orientation" 
                name="sexual_orientation" 
                type="radio" 
                value="asexual"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.sexual_orientation === 'asexual'}
              />
              <label htmlFor="asexual-sexual-orientation">Asexual</label>
              <input 
                id="demisexual-sexual-orientation" 
                name="sexual_orientation" 
                type="radio" 
                value="demisexual"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.sexual_orientation === 'demisexual'}
              />
              <label htmlFor="demisexual-sexual-orientation">Demisexual</label> 
              <input 
                id="pansexual-sexual-orientation" 
                name="sexual_orientation" 
                type="radio" 
                value="pansexual"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.sexual_orientation === 'pansexual'}
              />
              <label htmlFor="pansexual-sexual-orientation">Pansexual</label>
              <input 
                id="queer-sexual-orientation" 
                name="sexual_orientation" 
                type="radio" 
                value="queer"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.sexual_orientation === 'queer'}
              />
              <label htmlFor="queer-sexual-orientation">Queer</label>
              <input 
                id="questioning-sexual-orientation" 
                name="sexual_orientation" 
                type="radio" 
                value="questioning"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.sexual_orientation === 'questioning'}
              />
              <label htmlFor="questioning-sexual-orientation">Questioning</label>           
            </div>
            {formik.touched.sexual_orientation && formik.errors.sexual_orientation && <div className="errors">{formik.errors.sexual_orientation}</div>}

            <div className="show-sexual-orientation">              
              <input
                id="show-sexual-orientation"
                type="checkbox"
                name="show_sexual_orientation"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.show_sexual_orientation}
              />
            <label htmlFor="show-sexual-orientation">Show sexual orientation on my profile</label>              
            </div> 
            {formik.touched.show_sexual_orientation && formik.errors.show_sexual_orientation && <div className="errors">{formik.errors.show_sexual_orientation}</div>}  

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
            {formik.touched.gender_interest && formik.errors.gender_interest && <div className="errors">{formik.errors.gender_interest}</div>} 

            <label htmlFor="about">About Me</label>
                <textarea
                  id="about"
                  name="about"
                  type="text"
                  rows={6}                  
                  placeholder="Something about you..."
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.about}
              /> 
              {formik.touched.about && formik.errors.about && <div className="errors">{formik.errors.about}</div>}
            <button type="submit">Submit</button>         
          </section>
        </form>
      </div>
    </div>
  )
}

export default Onboarding