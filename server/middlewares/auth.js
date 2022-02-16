const admin = require('../firebase')
const User = require('../models/userModel')
exports.authCheck = async (req, res, next) => {
  // console.log(req.headers)
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
    // console.log('FirebaseUser in authCheck', firebaseUser)
    req.user = firebaseUser
    next()
  } catch (error) {
    // console.log(error)
    res.status(401).json({ error: 'Invalid or Expired Token' })
  }
}

exports.roleCheck = async (req, res, next) => {
  const { email } = req.user
  const adminUser = await User.findOne({ email }).exec()
  console.log(adminUser)
  if (adminUser.role === 'manager' || adminUser.role === 'admin') {
    next()
  } else {
    res.status(403).json({
      err: 'PRIVATE RESOURCE. ACCESS DENIED',
    })
  }
}

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user
  const adminUser = await User.findOne({ email }).exec()
  if (adminUser.role !== 'admin') {
    res.status(403).json({
      err: 'ADMIN RESOURCE. ACCESS DENIED',
    })
  } else {
    next()
  }
}
