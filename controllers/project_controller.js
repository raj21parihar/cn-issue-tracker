const Project = require('../models/project');

//to show all the projects
module.exports.allprojects = async function (req, res) {
    try {
        let projects = await Project.find({});
        return res.render('projects_list', {
            projects: projects,
        });
    } catch (err) {
        console.log('Error while getting projects!', err);
        return res.redirect('back');
    }
};

//to show the form for project creation
module.exports.newProjectForm = function (req, res) {
    return res.render('create_project_form');
};

//to create the new project
module.exports.createNewProject = function (req, res) {
    req.body.labels = req.body.labels.split(',');
    Project.create(req.body, function (err, project) {
        if (err) {
            console.log('Error while creating project!');
            return res.redirect('back');
        }
        return res.redirect('/');
    });
};
