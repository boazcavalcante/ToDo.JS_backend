
exports.up = function(knex) {
  return knex.schema.createTable('items', function(table){
    table.increments(); 
    table.string('title').notNullable(); 
    table.string('done').notNullable(); 
    table.string('user_id').notNullable(); 
    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('items');
};
