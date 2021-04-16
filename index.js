/*
* Code to check if required enviroment variables are set to run the application
*/

const applicationEnvVars = ['NODE_ENV', 'PORT', 'MONGO_URI']

const unusedEnvVars = applicationEnvVars.filter((i) => !process.env[i])
process.on('uncaughtExceptionMonitor', (error, origin) => console.log(origin, error))

if (unusedEnvVars.length) throw new Error('Required ENV variables are not set: [' + unusedEnvVars.join(', ') + ']')

const { PORT, NODE_ENV } = process.env
const { app } = NODE_ENV === 'dev' ? require('./src') : require('./build/src')

app.listen(PORT, _ => console.log(`server running on port ${PORT}!`))

module.exports = app
