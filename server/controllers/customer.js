const Customer = require('../models/customerModel')
const User = require('../models/userModel')
const cron = require('node-cron')
const shell = require('shelljs')
const nodemailer = require('nodemailer')
const moment = require('moment')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')
exports.createCustomer = async (req, res) => {
  const { name, phone, gymId, address, joinDate, active, planName, paid } =
    req.body.values.values

  // console.log(req.body.values.values)
  const planType = req.body.values.planType
  const planDuration = req.body.values.planDuration
  var validity = req.body.values.values

  let days = 0
  if (planType === 'Year') {
    days = planDuration * 365
  } else {
    days = planDuration * 30
  }
  var vt = new Date()
  vt.setDate(vt.getDate() + days)
  validity = vt

  try {
    const newCustomer = await new Customer({
      name,
      phone: parseInt(phone),
      gymId,
      address,
      paid,
      joinDate,
      validity,
      active,
      planName,
    }).save()
    res.status(200).json(newCustomer)
  } catch (error) {
    if (error.code == 11000) {
      var errorNew = error.keyValue
      res.status(400).json({ dbError: true, err: errorNew })
    }
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.createManager = async (req, res) => {
  const { id } = req.body
  try {
    const updateManager = await new User.findByIdAndUpdate(
      id,
      {
        role: 'manager',
      },
      { new: true }
    )
    res.status(200).json(updateManager)
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.getSingleCustomer = async (req, res) => {
  const { id } = req.params
  try {
    const customer = await Customer.findById(id)
    res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.getTotalCustomerCount = async (req, res) => {
  const totalMemberCount = await Customer.find({})
    .estimatedDocumentCount()
    .exec()
  res.json(totalMemberCount)
}

exports.getAllCustomer = async (req, res) => {
  try {
    const { sort, order, page, perPage } = req.body.payload
    const currentPage = page || 1

    const customer = await Customer.find({})
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec()
    return res.status(200).json(customer)
    res.json({ ok: true })
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.editCustomer = async (req, res) => {
  const memberid = req.body.values.memberid
  const values = req.body.values.values
  res.json({ ok: true })
  try {
    const editCustomer = await Customer.findByIdAndUpdate(memberid, values, {
      new: true,
    })
    res.status(200).json(editCustomer)
  } catch (error) {
    if (error.code == 11000) {
      var errorNew = error.keyValue
      res.status(400).json({ dbError: true, err: errorNew })
    }
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.removeCustomer = async (req, res) => {
  const { id } = req.params
  try {
    const removedUser = await Customer.findByIdAndRemove(id)
    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.updateCustomerPaid = async (req, res) => {
  const { memberid, status } = req.body.payload
  try {
    const updated = await Customer.findByIdAndUpdate(
      memberid,
      {
        paid: status,
      },
      {
        new: true,
      }
    )
    res.status(200).json(updated)
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.activeStatusChange = async (req, res) => {
  const { memberid, status } = req.body.payload
  try {
    const updated = await Customer.findByIdAndUpdate(
      memberid,
      {
        active: status,
      },
      {
        new: true,
      }
    )
    res.status(200).json(updated)
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.getPaidMembers = async (req, res) => {
  try {
    const { sort, order, page, perPage } = req.body.payload
    const currentPage = page || 1

    const customer = await Customer.find({ paid: true })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec()

    return res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.getPaidCount = async (req, res) => {
  try {
    const customer = await Customer.find({ paid: true })
    res.json(customer.length)
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.getUnpaidMembers = async (req, res) => {
  try {
    const { sort, order, page, perPage } = req.body.payload
    const currentPage = page || 1

    const customer = await Customer.find({ paid: false })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec()

    return res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.getUnpaidCount = async (req, res) => {
  try {
    const customer = await Customer.find({ paid: false })
    res.json(customer.length)
  } catch (error) {
    console.log('error', error)

    res.status(400).json({
      err: error.message,
    })
  }
}

const findbyName = async (req, res, keyWord) => {
  const member = await Customer.find({ name: keyWord }).exec()
  res.json(member)
}

const findbyGym = async (req, res, keyWord) => {
  const member = await Customer.find({ gymId: keyWord }).exec()
  res.json(member)
}

const findbyphone = async (req, res, keyWord) => {
  const member = await Customer.find({ phone: keyWord }).exec()
  res.json(member)
}
exports.getSearchResult = async (req, res) => {
  const { keyWord, sortBy } = req.body.payload
  if (sortBy === 'name') {
    await findbyName(req, res, keyWord)
  } else if (sortBy === 'gymId') {
    await findbyGym(req, res, keyWord)
  } else if (sortBy === 'phone') {
    await findbyphone(req, res, keyWord)
  }
}

exports.getAllPaidMembers = async (req, res) => {
  const members = await Customer.find({ paid: true })
    .sort([['gymId', 'asc']])
    .exec()
  if (members.length) {
    res.json({
      membersCheck: true,
      members,
    })
  } else {
    res.json({ membersCheck: false })
  }
}
exports.getAllUnpaidMembers = async (req, res) => {
  const members = await Customer.find({ paid: false })
    .sort([['gymId', 'asc']])
    .exec()
  if (members.length) {
    res.json({
      membersCheck: true,
      members,
    })
  } else {
    res.json({ membersCheck: false })
  }
}

// crons

//crons to check daily paid members

cron.schedule('0 0 * * *', async () => {
  try {
    var today = new Date()
    var customer = await Customer.updateMany(
      { validity: { $lt: today } },
      { $set: { paid: false } }
    )
    console.log('cron job update succesfully')
  } catch (error) {
    console.log(error)
  }
  console.log(today)
})

//crons to create daily unpaid csv
cron.schedule('55 5 * * * ', async () => {
  try {
    var today = new Date()
    today = moment(today).format('DD-MMM-YYYY')
    var customer = []
    customer = await Customer.find({ paid: false, active: true })
    console.log(customer)

    const csvWriter = createCsvWriter({
      path: `dailycsv/unpaidCsv-${today}.csv`,

      header: [
        {
          id: 'name',
          title: 'Name',
        },
        {
          id: 'phone',
          title: 'Phone',
        },
        {
          id: 'gymId',
          title: 'Gym_Id',
        },
        {
          id: 'paid',
          title: 'Paid',
        },
        {
          id: 'active',
          title: 'Active',
        },
      ],
    })

    csvWriter.writeRecords(customer).then(() => {
      console.log('..done')
    })
  } catch (error) {
    console.log(error)
  }
})

//cron to send daily unpaid mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
})

cron.schedule('0 6 * * * ', async () => {
  try {
    var customer = []
    customer = await Customer.find({ paid: false, active: true })
    console.log(customer)

    var today = new Date()
    today = moment(today).format('DD-MMM-YYYY')

    var message =
      '<table style="border: 1px solid #333;width:700;">' +
      '<caption>Unpaid Active Members List </caption> ' +
      '<br/>' +
      '<thead style="border: 1px solid #cccccc;">' +
      '<th style="border: 1px solid #cccccc;">Name   </th>' +
      '<th style="border: 1px solid #cccccc;">Phone   </th>' +
      '<th style="border: 1px solid #cccccc;">GymID  </th>' +
      '<th style="border: 1px solid #cccccc;">Paid   </th>' +
      '<th style="border: 1px solid #cccccc;">Active  </th>' +
      '</thead>'

    for (const { name, phone, gymId, paid, active } of customer) {
      message +=
        '<tr style="border: 1px solid #cccccc;">' +
        '<td>' +
        name +
        '</td>' +
        '<td>' +
        phone +
        '</td>' +
        '<td style="color: red">' +
        gymId +
        '</td>' +
        '<td>' +
        paid +
        '</td>' +
        '<td>' +
        active +
        '</td>' +
        '</tr>' +
        '<br/>'
    }
    message += '</table>'

    var mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: 'Gym Fee UnPaid List',
      html: message,
      attachments: [
        {
          filename: `unpaidCsv-${today}.csv`,
          path: `dailycsv/unpaidCsv-${today}.csv`,
        },
      ],
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      }
      if (info) {
        console.log(info)
      }
    })
  } catch (error) {
    console.log(error)
  }
})

//Database Backup Crons

cron.schedule('0 */2 * * *', () => backupMongoDB())
cron.schedule('55 */3 * * *', () => removePreviousBackup())

function removePreviousBackup() {
  const directory = './Backups'
  fs.readdir(directory, (err, files) => {
    if (err) throw err

    for (const file of files) {
      // console.log(file)
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err
      })
    }
  })
}

function backupMongoDB() {
  var time = Date.now()
  time = moment(time).format('DD--MM--YYYY_HH-mm-ss')
  console.log(time)
  const DB_NAME = 'MMG'

  const ARCHIVE_PATH = path.join(
    __dirname,
    '../Backups',
    `${DB_NAME}_${time}.gzip`
  )

  const child = spawn('mongodump', [
    `--db=${DB_NAME}`,
    `--archive=${ARCHIVE_PATH}`,
    '--gzip',
  ])
  child.stdout.on('data', (data) => {
    console.log('stdout:\n', data.toString())
  })
  child.stderr.on('data', (data) => {
    console.log('stderr:\n', data.toString())
  })
  child.on('error', (error) => {
    console.log('error', error.toString())
  })
  child.on('exit', (code, signal) => {
    if (code) console.log(`Process exit with code ${code}`)
    else if (signal) console.log(`Process terminated by signal ${signal}`)
    else console.log('Backup is succesfull')
  })
}
