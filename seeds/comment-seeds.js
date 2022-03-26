const { Comment } = require('../models');

const commentData = [{
  comment_id: "This is a comment.",
  user_id: 1,
  post_id: 1
},
{
  comment_id: "This is another comment!",
  user_id: 2,
  post_id: 2
},
{
  comment_id: "This is a thrid comment!",
  user_id: 3,
  post_id: 3
}
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;