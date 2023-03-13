const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller');

router.get('/', projectController.allprojects);
router.use('/project', require('./project'));
router.use('/issue', require('./issue'));

module.exports = router;
