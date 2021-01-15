const { decodeBase64 } = require('bcryptjs')
const express = require('express')
const session = require('express-session')
const KnexSessionStore = require("connect-session-knex")(session)
const server = express()
const userRoute= require('./api/route')
const db = require('./data/config-db')

server.use(express.json())

server.use(session({
	resave: false, // avoid recreating sessions that have not changed
	saveUninitialized: false, // to comply with GDPR laws
	secret: "keep it secret, keep it safe", // cryptographically sign the cookie
	store: new KnexSessionStore({
		knex: db, // configured instance of knex
		createtable: true, // if the sessions table doesn't exist, create it automatically
	}),
}))


server.use('/api/users',userRoute)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

const port = process.env.PORT || 5000

server.listen(port,()=>{
console.log(`server is running on port ${port}`)
})