exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user',function (table) {
      table.increments("id").primary();
      table.string("username",200);
      table.string("firstName",200);
      table.string("lastName",200);
      table.string("email",200);
      table.string("gender",10);
      table.string("photolink",200);
      table.string("facebookID",200);
			table.integer('age',3);
  	}).then(function () {
  		console.log("Created User Table")
  	}),

  	knex.schema.createTable("messages",function (table) {
  		table.increments("id").primary()
  		table.string("content",200);
			table.integer('userId',11).unsigned().references('id').inTable('user')
			table.dateTime("created_at");
  	}).then(function(){
  		console.log("Created Message Table")
  	})
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable("user"),
  	knex.schema.dropTable("messages")
  ])

};
