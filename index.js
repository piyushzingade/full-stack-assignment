const express = require('express');
const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];

const SUBMISSIONS = [];

// Simple admin check
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin";

// Signup route
app.post('/signup', function(req, res) {
  const { email, password } = req.body;

  // Check if the user already exists
  const userExists = USERS.find(user => user.email === email);
  if (userExists) {
    return res.status(400).send('User already exists.');
  }

  // Store email and password
  USERS.push({ email, password });
  res.status(200).send('Signup successful.');
});

// Login route
app.post('/login', function(req, res) {
  const { email, password } = req.body;

  // Check if the user exists
  const user = USERS.find(user => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).send('Invalid email or password.');
  }

  // Generate a simple token (for demonstration purposes)
  const token = Math.random().toString(36).substring(7);
  res.status(200).json({ token });
});

// Get questions route
app.get('/questions', function(req, res) {
  res.status(200).json(QUESTIONS);
});

// Get submissions route
app.get('/submissions', function(req, res) {
  res.status(200).json(SUBMISSIONS);
});

// Post submission route
app.post('/submissions', function(req, res) {
  const { user, problemTitle, solution } = req.body;

  // Randomly accept or reject the solution
  const isAccepted = Math.random() > 0.5;
  SUBMISSIONS.push({ user, problemTitle, solution, isAccepted });

  res.status(200).json({ isAccepted });
});

// Admin route to add a new problem
app.post('/problems', function(req, res) {
  const { email, password, newProblem } = req.body;

  // Check if the user is an admin
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(403).send('Forbidden. Only admins can add problems.');
  }

  // Add the new problem
  QUESTIONS.push(newProblem);
  res.status(200).send('Problem added successfully.');
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`);
});
