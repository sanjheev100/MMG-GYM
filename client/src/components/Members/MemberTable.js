import React from 'react'
import { CustomerEditModal, CustomerViewModal } from '..'
import { useSelector } from 'react-redux'
const MemberTable = ({ member, loadAllCustomers }) => {
  const { user } = useSelector((state) => ({ ...state }))

  var color = ''
  if (member.paid == true) {
    color = 'green'
  } else {
    color = 'red'
  }
  return (
    <tr>
      <td>{member.gymId}</td>
      <td>{member.name}</td>
      <td>{member.phone}</td>
      <td>{new Date(member.validity).toLocaleDateString()}</td>
      <td>{member.active == true ? 'Active' : 'Not Active'}</td>
      <td style={{ color: color, fontWeight: 600 }}>
        {member.paid == true ? 'Paid' : 'Not Paid'}
      </td>
      <td style={{ width: '80px' }} className='text-center'>
        <CustomerEditModal
          token={user.token}
          id={member._id}
          loadAllCustomers={loadAllCustomers}
        ></CustomerEditModal>
      </td>
      <td style={{ width: '80px' }} className='text-center'>
        <CustomerViewModal
          token={user.token}
          id={member._id}
        ></CustomerViewModal>
      </td>
    </tr>
  )
}

export default MemberTable
