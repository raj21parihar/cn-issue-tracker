const Project = require('../models/project');
const Issue = require('../models/issue');
const mongoose = require('mongoose');

module.exports.showAllIssuesOfProject = async function (req, res) {
    try {
        let project_id = req.params.id;
        let project = await Project.findById(project_id);

        //check if is valid project number, if invalid redirect back
        if (!project) {
            console.log('Error : Invalid project.');
            res.redirect('back');
        }

        if (req.query.reset == 'reset') {
            req.query.search = null;
            req.query.labels = null;
            req.query.author = null;
        }

        //get all distinct others if the issues for the project to show options in filter.
        let authors = await Issue.find({ project: project_id })
            .distinct('author')
            .exec();

        //create a search and filter query based on input provided
        let match = { project: mongoose.Types.ObjectId(project_id) };

        if (req.query.search) {
            match.$or = [
                { title: new RegExp(req.query.search, 'i') },
                { description: new RegExp(req.query.search, 'i') },
            ];
        }

        if (req.query.labels) {
            if (!Array.isArray(req.query.labels)) {
                req.query.labels = req.query.labels.split(',');
            }
            match.labels = { $in: req.query.labels };
        }

        if (req.query.author) {
            match.author = req.query.author;
        }

        //get the isseues nased on search and filter
        let issues = await Issue.aggregate([{ $match: match }]);

        return res.render('issue_list', {
            project: project,
            labels: project.labels,
            issues: issues,
            authors: authors,
            query: req.query,
        });
    } catch (err) {
        console.log('Error : ', err);
        return res.redirect('back');
    }
};

module.exports.newIssueForm = async function (req, res) {
    let project_id = req.query.pid;
    try {
        let project = await Project.findById(project_id);
        if (project) {
            return res.render('create_issue_form', {
                project: project,
            });
        }
    } catch (err) {
        console.log('Error : Invalid Project');
        return res.redirect('back');
    }
};

module.exports.createNewIssue = async function (req, res) {
    try {
        let project = await Project.findById(req.body.project);
        let newIssue = await Issue.create({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            labels: req.body.labels,
            project: req.body.project,
        });
        return res.redirect('/project/' + req.body.project);
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
    return;
};
