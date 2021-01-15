// "username": "janedoe",
// "password":"abc12345"

const express = require('express')

const model = require('./model')
const bcrypt = require('bcryptjs')
const router = express.Router()
router.use(express.json())


router.get('/', async (req,res,next)=>{

    try{
        const users = await model.find()
        res.status(200).json(users)
    }
    catch(err){next(err)    }
})

router.post('/register', async (req,res,next)=>{
    try{
        const {username,password} = req.body
        const user = await model.findBy({username}).first()
        if(user){
            return res.status(409).json({message:"username is already taken"})
        }
        const newUser = await model.add({
            username,
            password: await bcrypt.hash(password,12)
        })
        res.status(200).json(newUser)
    }
    catch(err){next(err)}
})
router.post('/login', async (req,res,next)=>{
    let authError = "invalid credentials"
    try {
        const {username,password} = req.body
       
        const user = await model.findBy({username}).first()
     
        // verify is the user exist based on username 
        if(!user){
            return res.status(401).json({message:authError})
        }
        const passwordVerified = await bcrypt.compare(password,user.password)

       if(!passwordVerified){
        return res.status(401).json(authError)
       }
       // if valid username and password, create new session and send it to client
       req.session.user = user
       console.log('session',user)
       res.json({message: `welcome ${user.username}!`})
      
    }
    catch(err){next(err)}
})

module.exports= router