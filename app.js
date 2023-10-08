const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}));

app.listen(3000);

app.get('/healthcheck', (req, res) =>{
    res.send('ok')
});

app.get('/', (req, res) =>{
    res.send('first page')
});
// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'database-1.cpkgs4mvvlco.ap-northeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'CHEN12mys',
    database: 'assignment'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});
app.get('/users', (req, res) => {
  res.send('Hello! This is the users page.');
});
// User Query API
app.get('/users', (req, res) => {
  const userId = req.query.id;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid or missing user id.' });
  }

  const query = 'SELECT * FROM user WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error querying user: ', error);
      return res.status(400).json({ error: 'Client Error Response', details: error.message });
    }

    if (results.length === 0) {
      return res.status(403).json({ error: 'User Not Existing' });
    }

    const user = results[0];
    const userObject = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    const successResponse = {
      data: {
        user: userObject,
        'request-date': new Date().toUTCString(),
      }
    };

    res.status(200).json(successResponse);
  });
});

//User Sign Up API
app.post('/users', (req, res) => {
  const requestData = req.body;
  const userPassword = requestData.password
  // console.log(userPassword)

  const passwordRegex = /^(?:(?=(?:[^A-Z]*[A-Z]))|(?=(?:[^a-z]*[a-z]))|(?=(?:[^\d]*\d))|(?=(?:[^\W_]*[~`!@#$%^&*()_+\-={[}\]|:;"'<,>.?\/])))[A-Za-z\d~`!@#$%^&*()_+\-={[}\]|:;"'<,>.?\/]{8,}$/;

  
  const isPasswordValid = userPassword.match(passwordRegex);

  if (!isPasswordValid) {
    return res.status(400).send({ error: 'Password does not meet the requirements.' });
  }

  const userName = requestData.name;
  const userEmail = requestData.email;
  const signupTime = new Date().toUTCString();
  const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
  connection.query(checkEmailQuery, [userEmail], (error, results) => {
    if (error) {
      console.error('Error checking email existence: ', error);
      return res.status(400).json({ error: 'Failed to create user.', details: error.message });
    }

    if (results.length > 0) {
      // Email already exists, return 409 Conflict
      return res.status(409).json({ error: 'Email Already Exists' });
    }



  // const query = 'INSERT INTO user SET ?';
    const query = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
    const values = [userName ,userEmail,userPassword];
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error inserting user: ', error);
        return res.status(400).json({ error: 'Client Error: Bad Request', details: error.message });
      }

      const userObject = { 
        id : results.insertId,
        name: userName, 
        email: userEmail,
      };

      const successResponse = {
        data: {
          user: userObject,
          'request-date': signupTime,  // Get the current UTC date and time
        }
      };
      res.status(200).json({successResponse});
    });
  });
});



