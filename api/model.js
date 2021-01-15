
const db = require('../data/config-db')

const find = ()=>{
    return db('users')
}
const findBy= credendials=>{
    return db('users').select('id','username','password').where(credendials)
}

const findById = id=>{
    return db('users').where('id',id).first()
}

const add=(user)=>{
    return db('users').insert(user)
}
const login = credentials=>{
    return db('users').insert(credentials)
}

module.exports = {find,findById ,add,findBy}