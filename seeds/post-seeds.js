const { Post } = require('../models');

const postData = [{
  title: 'Bla asdf idas moohuhu.',
  content: 'Lfewf sdfa weofj cosjd efo a foaoodf afdf.',
  user_id: 1

},
{
  title: 'Ao to sef sadfoas df efefeddd.',
  content: 'Edafd sdfasdf waef josdf stan marsh sdfasef dfsfe.',
  user_id: 2
},
{
  title: 'Usefa esofjoj dc s ejfjefj.',
  content: 'Sefwa we ejfoaedf sdjfjefj efj joo csadfaj.',
  user_id: 3
}
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;