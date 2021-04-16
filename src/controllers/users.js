import { createToken } from '../utils'
import { httpStatus } from '../constants'
import { Users } from '../models'
const bcrypt = require('bcrypt')

export const usersController = {
  signUpUser,
  userLogin
}

async function signUpUser (req, res) {
  const { firstname, lastname, password, email } = req.body
  const hash = await bcrypt.hash(password, 10)
  try {
    await Users.create({ firstname, lastname, password: hash, email })
    return res.json({ status: httpStatus.OK, msg: 'User created' })
  } catch (error) {
    return res.json({ status: 'error', error })
  }
}

async function userLogin (req, res) {
  const { email, password } = req.body
  try {
    const userDetails = await Users.findOne({ email }).lean() || {}
    const match = await bcrypt.compare(password, userDetails.password)
    if (match) res.setHeader('x-access-token', createToken({ id: userDetails._id, email: userDetails.email }))
    return res.json({ status: httpStatus.OK, msg: match ? 'User logged in successfully' : 'Incorrect email / password' })
  } catch (error) {
    return res.json({ status: 'error', error })
  }
}
