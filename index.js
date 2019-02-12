console.log('Hola');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/hugo-api', { useNewUrlParser: true })
.then(() => console.log('Connection with MongoDB'))
.catch(err => console.log('Could not connect to MongoDB', err));


const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
