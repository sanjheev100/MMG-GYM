import React, { useState, useEffect } from 'react'
import {
  getUnpaidMembersCount,
  getUnpaidMembers,
  getAllUnpaidMembers,
} from '../../api/customer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Container, Row, Spinner } from 'react-bootstrap'
import { Pagination } from 'antd'
import { MemberTable } from '../../components'
import { CSVLink } from 'react-csv'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
const UnpaidCustomers = () => {
  const { user } = useSelector((state) => ({ ...state }))

  const [membersCount, setMembersCount] = useState(0)
  const [page, setPage] = useState(1)
  const [members, setMembers] = useState([])
  const [buttonloading, setButtonLoading] = useState(false)
  const [unPaidDownload, setUnPaidDownload] = useState([])
  const [showButton, setShowButton] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.role === 'admin') {
      // toast.success('Welcome to Admin Dashboard')
    } else if (user.role === 'manager') {
      // toast.success('Welcome to Manager ')
    } else {
      // toast.error('You are not authorized to access this page')
      dispatch({ type: 'LOGOUT', payload: null })
      navigate('/login')
      return
    }
  }, [user])

  useEffect(() => {
    loadTotalUnPaidcount()
  }, [])

  useEffect(() => {
    loadUnPaidMembers()
  }, [page])

  const perPage = 10

  const loadUnPaidMembers = () => {
    const payload = {
      sort: 'gymId',
      order: 'asc',
      page,
      perPage,
    }
    getUnpaidMembers(user.token, payload)
      .then((res) => {
        setMembers(res.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.err)
      })
  }
  const loadTotalUnPaidcount = () => {
    getUnpaidMembersCount(user.token)
      .then((res) => {
        setMembersCount(res.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.err)
      })
  }

  //csv part

  const headers = [
    { label: 'Gym ID', key: 'gymId' },
    { label: 'Name', key: 'name' },
    { label: 'Phone', key: 'phone' },
    { label: 'Address', key: 'address' },
    { label: 'Paid', key: 'paid' },
    { label: 'Join Date', key: 'joinDate' },
    { label: 'Validity', key: 'validity' },
    { label: 'Active', key: 'active' },
    { label: 'Plan Name', key: 'planName' },
  ]

  const today = new Date()

  const csvReport = {
    filename: `UnPaidCustomers_${moment(today).format('DD-MMM-YYYY')}.csv`,
    headers: headers,
    data: unPaidDownload,
  }
  const handleUnPaidCustomerDownload = () => {
    setButtonLoading(true)
    getAllUnpaidMembers(user.token).then((res) => {
      if (res.data.membersCheck) {
        setUnPaidDownload(res.data.members)
        setButtonLoading(false)
        setShowButton(true)
        toast.success('Press Download to download the file')
      } else {
        setButtonLoading(false)

        setShowButton(false)
        return toast.error('No Members Found')
      }
    })
  }

  return (
    <>
      <Container>
        <h4 className='text-center'>UnPaid Customers List</h4>
        <div>
          <form
            className='form-inline my-2 my-lg-0'
            // onSubmit={handleSearch}
          >
            <div
              className='input-group mb-3'
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
              }}
            >
              {/* <select
                style={{
                  background: '#48afea',
                  borderColor: 'none',
                  borderRadius: '5px',
                  color: 'white',
                  height: '40px',
                }}
                required={true}
              >
                <option
                  value=''
                  style={{ color: 'black', backgroundColor: 'white' }}
                >
                  select filter
                </option>
                <option
                  style={{ color: 'black', backgroundColor: 'white' }}
                  value='name'
                >
                  Name
                </option>
                <option
                  style={{ color: 'black', backgroundColor: 'white' }}
                  value='gymId'
                >
                  Gym Id
                </option>
                <option
                  style={{ color: 'black', backgroundColor: 'white' }}
                  value='phone'
                >
                  Phone
                </option>
              </select> */}
              {/* <input
                type='text'
                // value={keyWord}
                style={{ height: '40px', flex: 2 }}
                // onChange={(e) => setKeyword(e.target.value)}
                // disabled={!sortBy}
                // placeholder={!sortBy ? 'select filter' : `Search ${sortBy}`}
              /> */}
              {buttonloading ? (
                <Button
                  variant='primary'
                  className='btn-sm btn-danger mt-3'
                  disabled
                  style={{
                    top: '-8px',
                    height: '40px',
                  }}
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
                <>
                  {showButton ? (
                    <>
                      <Button
                        className='btn-raised mt-3'
                        variant='primary'
                        style={{ top: '-8px', height: '40px' }}
                      >
                        <CSVLink style={{ color: 'white' }} {...csvReport}>
                          Download
                        </CSVLink>
                      </Button>
                    </>
                  ) : (
                    <Button
                      className='btn-raised mt-3'
                      variant='primary'
                      onClick={() => handleUnPaidCustomerDownload()}
                      style={{ top: '-8px', height: '40px' }}
                    >
                      Get File
                    </Button>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
        {!members.length ? (
          <p style={{ color: 'black' }}>No Customers Found</p>
        ) : (
          <div>
            <table className='table table-bordered'>
              <thead className='thead-light'>
                <tr>
                  <th scope='col' style={{ color: 'black' }}>
                    Gym Id
                  </th>
                  <th scope='col' style={{ color: 'black' }}>
                    Name
                  </th>
                  <th scope='col' style={{ color: 'black' }}>
                    Phone
                  </th>
                  <th scope='col' style={{ color: 'black' }}>
                    Validity
                  </th>
                  <th scope='col' style={{ color: 'black' }}>
                    Active
                  </th>
                  <th scope='col' style={{ color: 'black' }}>
                    Paid
                  </th>
                  <th scope='col' style={{ color: 'black' }}>
                    Edit/Remove
                  </th>
                  <th scope='col' style={{ color: 'black' }}>
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <MemberTable
                    member={m}
                    key={m._id}
                    loadAllCustomers={loadUnPaidMembers}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
      <Row>
        <nav className='col-md-4 offset-md-4 text-center pt-2 p-3'>
          <Pagination
            current={page}
            total={Math.ceil(membersCount / 10) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </Row>
    </>
  )
}

export default UnpaidCustomers
