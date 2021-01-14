
exports.up = async function(knex) {

    await knex.schema.createTable('users',tb=>{
        tb.increments('id')
        tb.text('username').notNull().unique()
        tb.text('password').notNull()
    })
  
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users')
  
};
