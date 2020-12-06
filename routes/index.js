//@ts-check

const express = require('express');
const path = require('path');
const { Question } = require('../lib/question');

const router = express.Router();


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/survey', async function (req, res, next) {
  res.send(await Question.getRawQuestions());
});


router.post('/survey/response', function (req, res, next) {
  const parsed = Question.parseResponse(req.body || {});

  res.send({ok: parsed != null, parsed});
});

module.exports = router;
