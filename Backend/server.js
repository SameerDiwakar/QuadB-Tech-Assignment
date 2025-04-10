const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const axios = require('axios');
const port = 4000;
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ndwnd93er932rh02'
const path = require('path');

app.use(express.json()); 
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: "https://quadb-tech-assignment-1.onrender.com",
    // origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      }
    );
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
});

app.post('/logout',(req,res)=>{
  res.cookie('token','').json(true)
})

app.get('/weather', async (req, res) => {
  const { city } = req.query;
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.response?.data || error.message); // Log the error
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error fetching weather data' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
