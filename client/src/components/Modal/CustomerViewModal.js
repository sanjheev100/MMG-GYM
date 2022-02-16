import React, { useState } from 'react'
import { Modal, Tooltip } from 'antd'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { getSingleMember } from '../../api/customer'
const CustomerViewModal = ({ token, id }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [singleMember, setSingleMember] = useState([])
  const [loading, setLoading] = useState(false)
  const handleModal = () => {
    setModalVisible(true)
  }

  const handleSingleMember = () => {
    setLoading(true)
    getSingleMember(token, id)
      .then((res) => {
        setLoading(false)
        setSingleMember(res.data)
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.err)
      })
  }

  return (
    <>
      <div onClick={handleModal}>
        <Tooltip title={'click to view customer details'}>
          <i className='fas fa-eye' onClick={() => handleSingleMember()}></i>
        </Tooltip>
      </div>
      <Modal
        title='Customer Details'
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false)
        }}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            className='mx-3 btn btn-danger'
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
              <>
                <table className='table table-bordered bg-light'>
                  <tbody className='tbody-ligth'>
                    <tr>
                      <th scope='col'>Name</th>
                      <td scope='col'>{singleMember.name}</td>
                    </tr>
                    <tr>
                      <th scope='col'>Phone</th>
                      <td scope='col'>{singleMember.phone}</td>
                    </tr>
                    <tr>
                      <th scope='col'>Gym Id</th>
                      <td scope='col'>{singleMember.gymId}</td>
                    </tr>
                    <tr>
                      <th scope='col'>Address</th>
                      <td scope='col'>{singleMember.address}</td>
                    </tr>
                    <tr>
                      <th scope='col'>Paid</th>
                      <td scope='col'>
                        {singleMember.paid == true ? 'Paid' : 'Not Paid'}
                      </td>
                    </tr>
                    <tr>
                      <th scope='col'>Active</th>
                      <td scope='col'>
                        {singleMember.active == true ? 'Active' : 'Not Active'}
                      </td>
                    </tr>
                    <tr>
                      <th scope='col'>Validity</th>
                      <td>
                        {new Date(singleMember.validity).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <th scope='col'>Join Date</th>
                      <td>
                        {new Date(singleMember.joinDate).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <th scope='col'>Plan Name</th>
                      <td>{singleMember.planName}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </>
        }
      </Modal>
    </>
  )
}

export default CustomerViewModal
