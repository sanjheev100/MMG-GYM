const express = require('express')
const router = express.Router()

//middlewares
const { authCheck, roleCheck, adminCheck } = require('../middlewares/auth')

//controllers

const {
  getAllDBUsers,
  updateManager,
  removeManager,
  deleteUser,
} = require('../controllers/users')

router.get('/getAllDBUsers', authCheck, adminCheck, getAllDBUsers)
router.put('/updateManager', authCheck, adminCheck, updateManager)
router.put('/removeManager', authCheck, adminCheck, removeManager)
router.delete('/deleteUser/:id', authCheck, adminCheck, deleteUser)

module.exports = router
