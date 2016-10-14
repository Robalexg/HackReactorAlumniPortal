
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
  	})

  	])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable("user")
  ])
};
