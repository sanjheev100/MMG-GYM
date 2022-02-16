import React from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'

const MemberAddForm = ({
  values,
  submitHandler,
  handleChange,
  loading,
  setValues,
  setPlanDuration,
  setPlanType,
  planType,
}) => {
  const { name, phone, gymId, address, joinDate, planName, active } = values
  const paidOptions = ['true', 'false']
  const plans = ['Weight Loss', 'Weight Gain']
  const planDurations = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ]
  const planTypes = ['Month', 'Year']

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>
            <strong>Member Name</strong>
          </Form.Label>
          <Form.Control
            type='text'
            autoFocus={true}
            required={true}
            placeholder='AAA'
            value={name}
            name='name'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='phone'>
          <Form.Label>
            <strong>Mobile Number</strong>
          </Form.Label>
          <Form.Control
            type='Number'
            required={true}
            placeholder='1234567890'
            value={phone}
            name='phone'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />

        <Form.Group controlId='gymId'>
          <Form.Label>
            <strong>Gym ID</strong>
          </Form.Label>
          <Form.Control
            type='Number'
            placeholder='AAABBB'
            value={gymId}
            name='gymId'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />

        <Form.Group controlId='address'>
          <Form.Label>
            <strong>Address</strong>
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='1,xxx street,aaa'
            value={address}
            name='address'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='joinDate'>
          <Form.Label>
            <strong>Joining Date</strong>
          </Form.Label>
          <Form.Control
            type='Date'
            placeholder='YYYY-MM-DD'
            value={joinDate}
            name='joinDate'
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='active'>
          <Form.Label>
            <strong>Active</strong>
          </Form.Label>
          <select
            required={true}
            name='active'
            value={active}
            className='form-control'
            onChange={handleChange}
          >
            <option value=''>Please Select</option>
            {paidOptions &&
              paidOptions?.map((p, index) => (
                <option key={index} value={p}>
                  {p}
                </option>
              ))}
          </select>
        </Form.Group>
        <br />
        {active == 'true' && (
          <>
            <Form.Group controlId='address'>
              <Form.Label>
                <strong>Paid</strong>
              </Form.Label>
              <select
                required={true}
                name='paid'
                className='form-control'
                onChange={handleChange}
              >
                <option value=''>Please Select</option>
                {paidOptions &&
                  paidOptions?.map((p, index) => (
                    <option key={index} value={p}>
                      {p}
                    </option>
                  ))}
              </select>
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
                onChange={(e) =>
                  setValues({ ...values, planName: e.target.value })
                }
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
              <br />

              {planName && (
                <>
                  <label className='mb-2'>
                    <strong>Plan Type</strong>
                  </label>
                  <select
                    required={true}
                    name='planType'
                    className='form-control'
                    onChange={(e) => setPlanType(e.target.value)}
                  >
                    <option value=''>Please Select</option>
                    {plans &&
                      planTypes.length > 0 &&
                      planTypes?.map((plan, index) => (
                        <option key={index} value={plan}>
                          {plan}
                        </option>
                      ))}
                  </select>
                </>
              )}
              <br />
              {planName && planType && (
                <>
                  <label className='mb-2'>
                    <strong>Plan Duration</strong>
                  </label>
                  <select
                    required={true}
                    name='planDuration'
                    className='form-control'
                    onChange={(e) => setPlanDuration(e.target.value)}
                  >
                    <option value=''>Please Select</option>
                    {plans &&
                      planDurations.length > 0 &&
                      planDurations?.map((plan, index) => (
                        <option key={index} value={plan}>
                          {plan}
                        </option>
                      ))}
                  </select>
                </>
              )}
            </div>
          </>
        )}
        <br />

        {loading ? (
          <Button variant='primary' className='btn-raised mt-3' disabled>
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
            type='submit'
            disabled={loading}
            className='btn-raised mt-3'
            variant='primary'
          >
            Add Member
          </Button>
        )}
      </Form>
    </>
  )
}

export default MemberAddForm
