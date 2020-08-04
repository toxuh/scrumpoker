const router = require('express').Router();

const Task = require('../models/Task');

router.get('/', async (req, res) => {
  console.log(req);
  
  const task = await Task.findOne({ _id: req.task.id });
});

module.exports = router;