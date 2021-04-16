import mongoose from 'mongoose'
import { MONGO_CONFIG } from './environment'

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
  console.log('Connection Established')
})

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected')
})

mongoose.connection.on('close', () => {
  console.log('Connection Closed')
})

mongoose.connection.on('error', (error) => {
  console.log('ERROR: ' + error)
  process.exit(1)
})

const connectMongo = async () => {
  const connectionuri = MONGO_CONFIG.URI

  const options = {
    useUnifiedTopology: true,
    autoReconnect: true,
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }

  await mongoose.connect(connectionuri, options).catch(error => {
    console.log('ERROR connecting to mongo: ' + error)
    process.exit(1)
  })
}

export { connectMongo }
