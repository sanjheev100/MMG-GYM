import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToReDirect from './LoadingToReDirect'
import { currentAdminCheck } from '../../api/auth'
const AdminRoute = () => {
  const { user } = useSelector((state) => ({ ...state }))

  const [ok, setOk] = useState(false)

  useEffect(() => {
    // console.log(user)
    if (user && user.token) {
      currentAdminCheck(user.token)
        .then((res) => {
          //   console.log('CURRENT ADMIN RES', res)
          setOk(true)
        })
        .catch((error) => {
          console.log('ADMIN ROUTE', error)
        })
    }
  }, [user])

  return ok ? <Outlet /> : <LoadingToReDirect />
}

export default AdminRoute
