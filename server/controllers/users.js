const User = require('../models/userModel')

exports.getAllDBUsers = async (req, res) => {
  try {
    const adminUser = await User.findOne({ email: req.user.email })

    const dbUsers = await User.find({ _id: { $ne: adminUser._id } })
    res.status(200).json(dbUsers)
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.updateManager = async (req, res) => {
  try {
    const { id, role } = req.body.payload

    var final = ''
    if (role == 'manager') {
      final = 'user'
    } else {
      final = 'manager'
    }
    const updatedManager = await User.findByIdAndUpdate(
      id,
      { role: final },
      { new: true }
    )
    res.json({ updatedManager })
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}
exports.removeManager = async (req, res) => {
  try {
    const { id } = req.body
    const removeManager = await User.findByIdAndUpdate(
      id,
      { role: 'user' },
      { new: true }
    )
    res.json({ removeManager })
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deleteUser = await User.findByIdAndDelete(id)
    res.json({ deleteUser })
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}
