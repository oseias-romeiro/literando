const express = require('express');
const https = require('https');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

// db
const { User, Favorite } = require('./db');

// constants
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const GKEY =  process.env.GKEY;
const GUID = process.env.GUID;

// middlewares
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

// index route
app.get('/', (req, res) => {
  res.send({
    message: 'Literando API',
  });
});

// autentication route
app.post('/auth', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      }
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.send({
      message: 'Authenticated',
      token,
    });

  } catch (error) {
    res.send({
      error: 'Error authenticating user',
      message: error.message,
    });
  }
});

// create account route
app.post('/user/create', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hash = await bcrypt.hash(req.body.password, 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });

    res.send({
      message: 'Account created',
      data: req.body,
    });
  } catch (error) {
    res.send({
      error: 'Error creating account',
      message: error.message,
    });
  }
});

// delete account
app.delete('/user/delete', verifyToken, async (req, res) => {
  try {
    await Favorite.destroy({
      where: {
        user: req.user.id,
      }
    });
    await User.destroy({
      where: {
        id: req.user.id,
      }
    });

    res.send({
      message: 'Account deleted',
    });
  } catch (error) {
    res.send({
      error: 'Error deleting account',
      message: error.message,
    });
  }
});

// get user favorites
app.get('/user/favorites/list', verifyToken, async (req, res) => {
  console.log(req.user);
  try {
    const favorites = await Favorite.findAll({
      where: {
        userId: req.user.id,
      }
    });

    res.send({
      data: favorites,
    });
  } catch (error) {
    res.send({
      error: 'Error getting favorites',
      message: error.message,
    });
  }
});

// add favorite
app.post('/user/favorites/create', verifyToken, async (req, res) => {
  try {
    await Favorite.create({
      stars: req.body.stars,
      notes: req.body.notes,
      tags: req.body.tags,
      title: req.body.title,
      image: req.body.image,
      userId: req.user.id,
      bookId: req.body.bookId,
    });

    res.send({
      message: 'Favorite added',
      data: req.body,
    });
  } catch (error) {
    res.send({
      error: 'Error adding favorite',
      message: error.message,
    });
  }
});

// remove favorite
app.delete('/user/favorites/:bookId/delete', verifyToken, async (req, res) => {
  try {
    await Favorite.destroy({
      where: {
        userId: req.user.id,
        bookId: req.params.bookId,
      }
    });

    res.send({
      message: 'Favorite removed',
      data: req.params,
    });
  } catch (error) {
    res.send({
      error: 'Error removing favorite',
      message: error.message,
    });
  }
});

// get book route
app.get('/books/:bookId', (req, res) => {
  https.get(`https://www.googleapis.com/books/v1/volumes/${req.params.bookId}?key=${GKEY}`,
    (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => { res.send(JSON.parse(data)) });
    },
    (error) => {
      res.send({
        message: 'Error',
        error,
      });
    }
  );
});

// get library
app.get('/library/:libraryId', (req, res) => {
  https.get(`https://www.googleapis.com/books/v1/users/${GUID}/bookshelves/${req.params.libraryId}/volumes?startIndex=${req.query.startIndex || 0}&key=${GKEY}`,
    (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => { res.send(JSON.parse(data)) });
    },
    (error) => {
      res.send({
        message: 'Error',
        error,
      });
    }
  );
});

// search books
app.get('/search', (req, res) => {
  // filters
  const q = req.query.filter ?
    `https://www.googleapis.com/books/v1/volumes?q=${req.query.q || ''}&printType=books&startIndex=${req.query.startIndex || 0}&orderBy=${req.query.orderBy || 'relevance'}&filter=${req.query.filter}&langRestrict=${req.query.langRestrict || ''}&key=${GKEY}`
    :
    `https://www.googleapis.com/books/v1/volumes?q=${req.query.q || ''}&printType=books&startIndex=${req.query.startIndex || 0}&orderBy=${req.query.orderBy || 'relevance'}&langRestrict=${req.query.langRestrict || ''}&key=${GKEY}`
  ;
  // request
  https.get(q,
    (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => { res.send(JSON.parse(data)) });
    },
    (error) => {
      res.send({
        message: 'Error',
        error,
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
