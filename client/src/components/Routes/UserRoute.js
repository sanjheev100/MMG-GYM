import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToReDirect from './LoadingToReDirect'
const UserRoute = () => {
  const { user } = useSelector((state) => ({ ...state }))

  return user && user.token ? <Outlet /> : <LoadingToReDirect />
}

export default UserRoute
