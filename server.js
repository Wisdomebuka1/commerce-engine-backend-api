require('dotenv').config()
const {databaseConnection} = require('./database/db')
databaseConnection()
const {app} = require('./app')




