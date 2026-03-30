import axios from 'axios'
import mongoose from 'mongoose'
import { ENV } from './src/config/env.js'
import { User } from './src/models/user.model.js'

const base = `http://localhost:${ENV.PORT}/api`

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function run(){
  try{
    const timestamp = Date.now()
    const email = `testreset${timestamp}@example.com`
    const password = 'oldPassword123'
    const newPassword = 'newPassword123'

    console.log('Registering user:', email)
    await axios.post(`${base}/register`, { fullName: 'Test User', email, password }, { headers: {'Content-Type':'application/json'} })
    console.log('Registered')

    console.log('Requesting forgot-password')
    await axios.post(`${base}/auth/forgot-password`, { email }, { headers: {'Content-Type':'application/json'} })
    console.log('Forgot password requested')

    // wait a moment for DB write
    await sleep(500)

    console.log('Connecting to DB to fetch token')
    await mongoose.connect(ENV.MONGO_URI)
    const user = await User.findOne({ email }).lean()
    if(!user){
      console.error('User not found in DB')
      process.exit(1)
    }
    const token = user.resetPasswordToken
    console.log('Found token:', token ? 'YES' : 'NO')
    if(!token){
      console.error('No reset token found')
      process.exit(1)
    }

    console.log('Calling reset endpoint with new password')
    await axios.post(`${base}/auth/reset-password/${token}`, { password: newPassword }, { headers: {'Content-Type':'application/json'} })
    console.log('Password reset request completed')

    // try to login with new password
    console.log('Trying login with NEW password')
    const loginResNew = await axios.post(`${base}/login`, { email, password: newPassword }, { headers: {'Content-Type':'application/json'}, withCredentials: true })
    console.log('Login with new password succeeded:', loginResNew.data?.message)

    // try to login with old password
    try{
      await axios.post(`${base}/login`, { email, password }, { headers: {'Content-Type':'application/json'}, withCredentials: true })
      console.error('Login with OLD password unexpectedly succeeded')
    }catch(e){
      console.log('Login with OLD password failed as expected')
    }

    console.log('Test completed')
    await mongoose.disconnect()
    process.exit(0)
  }catch(err){
    console.error('Test error:', err.response?.data || err.message || err)
    try{ await mongoose.disconnect() }catch(e){}
    process.exit(1)
  }
}

run()
