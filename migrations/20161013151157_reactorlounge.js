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
      table.integer("likes");
			table.integer('userId',11).unsigned().references('id').inTable('user');
      table.string("msgImageUrl", 200);
			table.timestamp("created_at");
  	}).then(function(){
  		console.log("Created Message Table")
  	}),

    knex.schema.createTable("comments",function (table) {
      table.increments("id").primary()
      table.string("content",200);
      table.integer("likes");
      table.integer('userId',11).unsigned().references('id').inTable('user');
      table.integer('msgId',11).unsigned().references('id').inTable('messages');
      table.timestamp("created_at");
    }).then(function(){
      console.log("Created Comments Table")
  	}),

    knex.schema.createTable("sessions",function (table) {
      table.increments("id").primary()
      table.string("sessionId");
    }).then(function () {
      console.log("Created Sessions Table");
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable("user"),
    knex.schema.dropTable("comments"),
  	knex.schema.dropTable("messages"),
    knex.schema.dropTable("sessions")
  ])

};
