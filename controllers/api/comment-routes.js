const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
router.get('/', (req, res) => {
  Comment.findAll({})
    .then(db_commentData => res.json(db_commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  Comment.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(db_commentData => res.json(db_commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_id: req.body.comment_id,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then(db_commentData => res.json(db_commentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  }
});

router.put('/:id', withAuth, (req, res) => {
  Comment.update({
    comment_id: req.body.comment_id
  }, {
    where: {
      id: req.params.id
    }
  }).then(db_commentData => {
    if (!db_commentData) {
      res.status(404).json({ message: 'Comment not found with given id.' });
      return;
    }
    res.json(db_commentData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(db_commentData => {
    if (!db_commentData) {
      res.status(404).json({ message: 'Comment not found with given id.' });
      return;
    }
    res.json(db_commentData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;