import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCustomer,
  getSearchResult,
  getSingleMember,
  getTotalCustomerCount,
} from '../../api/customer'
import { Button, Container, Row, Spinner } from 'react-bootstrap'
import { Pagination } from 'antd'
import {
  CustomerEditModal,
  CustomerViewModal,
  MemberTable,
} from '../../components'
import { toast } from 'react-toastify'
import './AllCustomer.css'
import { useNavigate } from 'react-router-dom'
const AllCustomers = () => {
  const { user, filterApplied } = useSelector((state) => ({ ...state }))

  const [allMembers, setMembers] = useState([])
  const [totalCustomerCount, setTotalCustomerCount] = useState(0)
  const [page, setPage] = useState(1)

  const [sortBy, setSortBy] = useState('')
  const [keyWord, setKeyword] = useState('')
  const [buttonloading, setButtonLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && user != null) {
      if (user.role === 'admin') {
        // pass
      } else if (user.role === 'manager') {
        // continue
      } else {
        dispatch({ type: 'LOGOUT', payload: null })
        navigate('/login')
        return
      }
    }
  }, [user])

  useEffect(() => {
    loadCustomerCount()
  }, [])

  useEffect(() => {
    loadAllCustomers()
  }, [page])

  const loadCustomerCount = async () => {
    getTotalCustomerCount(user.token).then((res) => {
      setTotalCustomerCount(res.data)
      console.log(res.data)
      // toast.success('Total Customer Count Loaded')
    })
  }

  const perPage = 10
  const loadAllCustomers = () => {
    const payload = {
      sort: 'gymId',
      order: 'asc',
      page,
      perPage,
    }
    dispatch({ type: 'FILTER_APPLIED', payload: false })

    getAllCustomer(user.token, payload)
      .then((res) => {
        setMembers(res.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.err)
      })
  }

  const handleSearch = () => {
    if (keyWord == '' || sortBy == '') {
      return toast.error('Please Fill All Required Fields in Format')
    }
    setMembers([])
    searchByFilter()
  }

  const searchByFilter = () => {
    var payload = {
      keyWord,
      sortBy,
    }
    setButtonLoading(true)
    dispatch({ type: 'FILTER_APPLIED', payload: true })

    if (sortBy == 'gymId' || sortBy == 'phone') {
      console.log(parseInt(keyWord))
      if (parseInt(keyWord) == 'NaN') {
        return toast.error('Please Enter Valid Number Without e')
      } else {
        keyWord = keyWord.toLowerCase()
      }
    }

    getSearchResult(user.token, payload)
      .then((res) => {
        setMembers(res.data)
        console.log(res.data)
        setTotalCustomerCount(allMembers.length)
        console.log(res.data)
        setButtonLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setButtonLoading(false)

        toast.error(err.response.data.err)
      })
  }

  const handleClearFilter = () => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setKeyword('')
    setSortBy('')
    setMembers([])
    loadAllCustomers()
    loadCustomerCount()
  }

  var inputType = 'text'
  if (sortBy == 'gymId' || sortBy == 'phone') {
    inputType = 'number'
  }

  return (
    <>
      <Container>
        {filterApplied && (
          <Button
            className='clearbtn btn-sm'
            style={{ marginTop: '-10px' }}
            onClick={handleClearFilter}
            style={{
              position: 'fixed',
              bottom: 150,
              right: 20,
              zIndex: 2,
            }}
          >
            Clear
          </Button>
        )}
        <h4 className='text-center'>Customers List</h4>
        <div>
          <form className='form-inline my-2 my-lg-0' onSubmit={handleSearch}>
            <div
              className='input-group mb-3'
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <select
                style={{
                  background: '#48afea',
                  borderColor: 'none',
                  borderRadius: '5px',
                  color: 'white',
                  height: '40px',
                }}
                required={true}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}

                // name='active'
                // value={active}
                // className='form-control'
                // onChange={handleChange}
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
              </select>
              <input
                type={inputType}
                value={keyWord}
                style={{ height: '40px', flexGrow: 1 }}
                onChange={(e) => setKeyword(e.target.value)}
                disabled={!sortBy}
                placeholder={!sortBy ? 'select filter' : `Search ${sortBy}`}
              />
              {buttonloading ? (
                <Button
                  variant='primary'
                  className='btn-sm btn-danger mt-3'
                  disabled
                  style={{ top: '-8px', height: '40px' }}
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
                  onClick={() => handleSearch()}
                  style={{ top: '-8px', height: '40px' }}
                >
                  Search
                </Button>
              )}
            </div>
          </form>
        </div>
        {!allMembers.length ? (
          <p style={{ color: 'black' }}>No Customers Found</p>
        ) : (
          <Container>
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
                  {allMembers.map((m) => (
                    <MemberTable
                      member={m}
                      key={m._id}
                      loadAllCustomers={loadAllCustomers}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        )}
      </Container>
      <Row>
        <nav className='col-md-4 offset-md-4 text-center pt-2 p-3'>
          <Pagination
            current={page}
            total={Math.ceil(totalCustomerCount / 10) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </Row>
    </>
  )
}

export default AllCustomers
