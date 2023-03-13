const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue_controller');

router.get('/new', issueController.newIssueForm);
router.post('/create', issueController.createNewIssue);

module.exports = router;
