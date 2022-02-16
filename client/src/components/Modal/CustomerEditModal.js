import React, { useState } from 'react'
import { Modal, Tooltip } from 'antd'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import {
  editCustomer,
  getSingleMember,
  removeCustomer,
} from '../../api/customer'
import { MemberEditForm } from '..'

const intitalState = {
  name: '',
  phone: '',
  gymId: '',
  address: '',
  paid: '',
  joinDate: '',
  validity: '',
  active: '',
  planName: '',
}

const CustomerEditModal = ({ token, id, loadAllCustomers }) => {
  const { user } = useSelector((state) => ({ ...state }))

  const [modalVisible, setModalVisible] = useState(false)
  const [singleMember, setSingleMember] = useState([])
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState(intitalState)

  const handleModal = () => {
    setModalVisible(true)
  }

  const handleSingleMember = () => {
    setLoading(true)
    getSingleMember(token, id)
      .then((res) => {
        setLoading(false)
        setValues({ ...values, ...res.data })
        setSingleMember(res.data)
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.err)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let answer = window.confirm('Are you sure want to update?')
    if (answer) {
      var payload = {
        memberid: id,
        values,
      }
      editCustomer(user.token, payload)
        .then((res) => {
          toast.success('Member Updated')
          setLoading(false)
          setModalVisible(false)
          loadAllCustomers()
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
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleDeleteMember = () => {
    let answer = window.confirm('Are you sure want to Delete?')
    if (answer) {
      setLoading(true)
      removeCustomer(user.token, id)
        .then((res) => {
          setLoading(false)
          setModalVisible(false)
          loadAllCustomers()
          toast.error('Member Removed Succesfully')
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err.response.data.err)
        })
    }
  }
  return (
    <>
      <div onClick={handleModal}>
        <Tooltip title={'click to Edit customer details'}>
          <i
            className='fa-regular fa-pen-to-square'
            onClick={() => handleSingleMember()}
          ></i>
        </Tooltip>
      </div>
      <Modal
        title='Customer Edit '
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false)
        }}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            className='mx-3 btn btn-primary'
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>,
          <Button
            className='mx-3 btn btn-danger'
            onClick={() => handleDeleteMember()}
          >
            Delete
          </Button>,
          <Button
            className='mx-3 btn btn-primary'
            onClick={() => setModalVisible(false)}
          >
            Close
          </Button>,
        ]}
      >
        {
          <>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <MemberEditForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                values={values}
                memberid={id}
                setValues={setValues}
                handleSingleMember={handleSingleMember}
                loadAllCustomers={loadAllCustomers}
              />
            )}
          </>
        }
      </Modal>
    </>
  )
}

export default CustomerEditModal
