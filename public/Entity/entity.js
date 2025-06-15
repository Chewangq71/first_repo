// ./public/Entity/entity.js
const { EntitySchema } = require('typeorm');

const UserSchema = new EntitySchema({
  name: 'UserAuth',  //This is the table name inside of DB nest
  tableName: 'users', //This is meta tabl
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
  },
});

module.exports = {
  UserSchema,
};
