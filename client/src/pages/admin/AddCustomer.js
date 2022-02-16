import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createCustomer } from '../../api/customer'
import { UserNav } from '../../components'
import { FormContainer, MemberAddForm } from '../../components'

const intitalState = {
  name: '',
  phone: '',
  gymId: '',
  address: '',
  paid: false,
  joinDate: '',
  planName: '',
  validity: '',
  active: '',
}

const AddCustomer = () => {
  const [values, setValues] = useState(intitalState)
  const [loading, setLoading] = useState(false)
  const [planDuration, setPlanDuration] = useState('')
  const [planType, setPlanType] = useState('')

  const { user } = useSelector((state) => ({ ...state }))

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.role === 'admin') {
      // toast.success('Welcome  Admin Dashboard')
    } else if (user.role === 'manager') {
      // toast.success('Welcome  Manager ')
    } else {
      // toast.error('You are not authorized to access this page')
      dispatch({ type: 'LOGOUT', payload: null })
      navigate('/login')
      return
    }
  }, [user])

  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

  const submitHandler = (e) => {
    e.preventDefault()
    if (!phoneRegex.test(values.phone)) {
      return toast.error('Enter a Valid Phone Number')
    }
    console.table(values)
    if (!values.name || !values.gymId || !values.address || !values.active) {
      return toast.error('All are Required Fields')
    }
    setLoading(true)
    var payload = {
      values,
      planType,
      planDuration,
    }
    createCustomer(user.token, payload)
      .then((res) => {
        setLoading(false)
        toast.success('User Added')
        // setValues('')
      })
      .catch((err) => {
        setLoading(false)
        if (
          err.response.data.dbError !== 'undefined' &&
          err.response.data.dbError === true
        ) {
          return toast.error(
            `User with this  ${Object.keys(
              err.response.data.err
            )}  already exists`
          )
        }

        console.log(err.response.data)
        toast.error(err.response.data.err, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <FormContainer>
              <MemberAddForm
                values={values}
                submitHandler={submitHandler}
                handleChange={handleChange}
                loading={loading}
                setValues={setValues}
                setPlanDuration={setPlanDuration}
                setPlanType={setPlanType}
                planType={planType}
              />
            </FormContainer>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCustomer
