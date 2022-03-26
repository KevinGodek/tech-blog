const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['[password'] }
  })
    .then(db_userData => res.json(db_userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [{
      model: Post,
      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ]
    },
    {
      model: Comment,
      attributes: [
        'id',
        'comment_id', 
        'created_at'],
      include: {
        model: Post,
        attributes: ['title']
      }
    },
    {
      model: Post,
      attributes: ['title'],
    }
    ]
  })
    .then(db_userData => {
      if (!db_userData) {
        res.status(404).json({ message: 'User not found with given id.' });
        return;
      }
      res.json(db_userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', (req, res) => {

  User.create({
    username: req.body.username,
    password: req.body.password
  })

    .then(db_userData => {
      req.session.save(() => {
        req.session.user_id = db_userData.id;
        req.session.username = db_userData.username;
        req.session.loggedIn = true;
        res.json(db_userData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(db_userData => {
    if (!db_userData) {
      res.status(400).json({ message: 'Username not found.' });
      return;
    }
    const validPassword = db_userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password.' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = db_userData.id;
      req.session.username = db_userData.username;
      req.session.loggedIn = true;
      res.json({ user: db_userData, message: 'You are now logged in.' });
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => {

  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(db_userData => {
      if (!db_userData[0]) {
        res.status(404).json({ message: 'User not found with given id.' });
        return;
      }
      res.json(db_userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(db_userData => {
      if (!db_userData) {
        res.status(404).json({ message: 'User not found with given id.' });
        return;
      }
      res.json(db_userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;