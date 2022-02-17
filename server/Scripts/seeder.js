const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Customer = require('../models/customerModel')
const Data = require('./data.json')

dotenv.config()

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((error) => console.log(`DB CONNECTION ERROR ${error}`))

const importData = async () => {
  try {
    await Customer.deleteMany()
    const createUser = await Customer.insertMany(Data)
    console.log('Data Imported!')
  } catch (error) {
    console.error(`DATA IMPORT ERROR -${error}`)
    process.exit(1)
  }
}

if (process.argv) {
  importData()
}
