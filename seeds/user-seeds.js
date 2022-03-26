const { User } = require('../models');

const userData = [{
  username: 'Stan',
  password: '123'

},
{
  username: 'Randy',
  password: '1234'
},
{
  username: 'Eric',
  password: 'Cartman'
}
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;