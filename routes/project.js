const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller');
const issueController = require('../controllers/issue_controller');

router.get('/new', projectController.newProjectForm);
router.get('/:id', issueController.showAllIssuesOfProject);
router.post('/create', projectController.createNewProject);

module.exports = router;
