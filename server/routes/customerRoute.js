const express = require('express')
const router = express.Router()

//middlewares
const { authCheck, roleCheck, adminCheck } = require('../middlewares/auth')

//controllers

const {
  createCustomer,
  createManager,
  getSingleCustomer,
  getAllCustomer,
  editCustomer,
  removeCustomer,
  getTotalCustomerCount,
  updateCustomerPaid,
  activeStatusChange,
  getPaidMembers,
  getPaidCount,
  getUnpaidMembers,
  getSearchResult,
  getUnpaidCount,
  getAllUnpaidMembers,
  getAllPaidMembers,
} = require('../controllers/customer')

router.post('/createCustomer', authCheck, roleCheck, createCustomer)
router.put('/createNewManager', authCheck, adminCheck, createManager)
router.get('/getCustomer/:id', authCheck, roleCheck, getSingleCustomer)
router.post('/getAllCustomer', authCheck, roleCheck, getAllCustomer)
router.put('/editCustomer', authCheck, roleCheck, editCustomer)
router.delete('/removeCustomer/:id', authCheck, roleCheck, removeCustomer)
router.put('/paidStatusChange', authCheck, roleCheck, updateCustomerPaid)
router.put('/activeStatusChange', authCheck, roleCheck, activeStatusChange)
router.post('/getPaidMembers', authCheck, roleCheck, getPaidMembers)
router.get('/getPaidCount', authCheck, roleCheck, getPaidCount)
router.post('/getUnpaidMembers', authCheck, roleCheck, getUnpaidMembers)
router.get('/getUnpaidCount', authCheck, roleCheck, getUnpaidCount)
router.post('/getSearchResult', authCheck, roleCheck, getSearchResult)
router.get('/getAllUnpaidMembers', authCheck, roleCheck, getAllUnpaidMembers)
router.get('/getAllPaidMembers', authCheck, roleCheck, getAllPaidMembers)

router.get('/totalCustomerCount', authCheck, roleCheck, getTotalCustomerCount)
module.exports = router
