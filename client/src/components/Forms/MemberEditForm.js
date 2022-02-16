import React, { useState } from 'react'
import { Button, Form, FormControl, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { activeStatusChange, paidStatusChange } from '../../api/customer'
import moment from 'moment'
const MemberEditForm = ({
  handleSingleMember,
  handleSubmit,
  handleChange,
  values,
  memberid,
  loadAllCustomers,
  setValues,
}) => {
  const {
    name,
    phone,
    gymId,
    address,
    paid,
    joinDate,
    validity,
    active,
    planName,
  } = values

  const [buttonloading, setButtonLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  const plans = ['Weight Loss', 'Weight Gain']

  const handlePaidUpdate = (val) => {
    var payload = {
      memberid,
      status: val,
    }
    setButtonLoading(true)
    paidStatusChange(user.token, payload)
      .then((res) => {
        setButtonLoading(false)
        toast.success('Paid Status Updated')
        handleSingleMember()
        loadAllCustomers()
      })
      .catch((err) => {
        setButtonLoading(false)

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

  values.joinDate = moment(values.joinDate).format('YYYY-MM-DD')
  values.validity = moment(values.validity).format('YYYY-MM-DD')

  const handleActiveUpdate = (val) => {
    var payload = {
      memberid,
      status: val,
    }
    activeStatusChange(user.token, payload)
      .then((res) => {
        setButtonLoading(false)
        toast.success('Active Status Updated')
        handleSingleMember()
        loadAllCustomers()
      })
      .catch((err) => {
        setButtonLoading(false)

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
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='name'>
          <Form.Label style={{ color: 'black' }}>Member Name</Form.Label>
          <Form.Control
            type='text'
            autoFocus={true}
            required={true}
            placeholder='Product Name'
            value={name}
            name='name'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='phone'>
          <Form.Label style={{ color: 'black' }}>Member Phone</Form.Label>
          <Form.Control
            type='Number'
            required={true}
            placeholder='Phone'
            value={phone}
            name='phone'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />

        <Form.Group controlId='gymId'>
          <Form.Label style={{ color: 'black' }}>Gym Id</Form.Label>
          <Form.Control
            type='Number'
            required={true}
            placeholder='Phone'
            value={gymId}
            name='gymId'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />

        <Form.Group controlId='address'>
          <Form.Label style={{ color: 'black' }}>Address</Form.Label>
          <Form.Control
            type='text'
            required={true}
            placeholder='Phone'
            value={address}
            name='address'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />

        <Form.Group controlId='paid'>
          <Form.Label style={{ color: 'black' }}>Paid Status</Form.Label>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Form.Control
              type='text'
              placeholder={paid == true ? 'Paid' : 'Not Paid'}
              aria-label='Disabled input example'
              disabled
              readOnly
              style={{ width: '350px' }}
            />

            {buttonloading ? (
              <Button
                variant='primary'
                className='btn-sm btn-danger mt-3'
                disabled
              >
                <Spinner
                  as='span'
                  animation='grow'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
                {'  '}
                Loading...
              </Button>
            ) : (
              <Button
                className='btn-raised mt-3'
                variant='primary'
                onClick={() => handlePaidUpdate(!paid)}
              >
                Change
              </Button>
            )}
            {/* <Button onClick={() => handlePaidUpdate(!paid)}>Change</Button> */}
          </div>
        </Form.Group>
        <br />
        <Form.Group controlId='paid'>
          <Form.Label style={{ color: 'black' }}>Active Status</Form.Label>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Form.Control
              type='text'
              placeholder={active == true ? 'Active' : 'Not Active'}
              aria-label='Disabled input example'
              disabled
              readOnly
              style={{ width: '350px' }}
            />

            {buttonloading ? (
              <Button
                variant='primary'
                className='btn-sm btn-danger mt-3'
                disabled
              >
                <Spinner
                  as='span'
                  animation='grow'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
                {'  '}
                Loading...
              </Button>
            ) : (
              <Button
                className='btn-raised mt-3'
                variant='primary'
                onClick={() => handleActiveUpdate(!active)}
              >
                Change
              </Button>
            )}
          </div>
        </Form.Group>

        <br />

        <Form.Group controlId='joinDate'>
          <Form.Label style={{ color: 'black' }}>Join Date</Form.Label>
          <Form.Control
            type='Date'
            required={true}
            placeholder=''
            value={joinDate}
            name='joinDate'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />

        <Form.Group controlId='validity'>
          <Form.Label style={{ color: 'black' }}>Validity</Form.Label>
          <Form.Control
            type='Date'
            required={true}
            placeholder=''
            value={validity}
            name='validity'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />

        <div className='form-group mb-2'>
          <label className='mb-2'>
            <strong>Plan Name</strong>
          </label>
          <select
            required={true}
            name='planName'
            className='form-control'
            onChange={(e) => setValues({ ...values, planName: e.target.value })}
          >
            <option value=''>Please Select</option>
            {plans &&
              plans.length > 0 &&
              plans?.map((plan, index) => (
                <option key={index} value={plan}>
                  {plan}
                </option>
              ))}
          </select>
        </div>
        <br />
      </Form>
    </div>
  )
}

export default MemberEditForm
