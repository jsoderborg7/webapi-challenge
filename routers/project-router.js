const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) =>{
  Projects.get()
    .then(project =>{
      res.status(200).json(project)
    })
    .catch(err =>{
      res.status(500).json({message: "Could not retrieve projects"})
    })
});

router.post('/', (req, res) =>{
  Projects.insert(req.body)
    .then(project =>{
      res.status(200).json(project)
    })
    .catch(err =>{
      res.status(500).json({message: "There was a problem creating this project"})
    })
})

router.put('/:id', (req, res) =>{
  Projects.update(req.params.id, req.body)
    .then(project =>{
      if (project){
        res.status(200).json({...req.body, id: req.params.id})
      } else {
        res.status(404).json({errorMessage: "The project with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res.status(500).json({error: "The project could not be updated."})
    })
});

router.delete('/:id', (req, res) =>{
  Projects.remove(req.params.id)
    .then(project =>{
      if (project){
        res.status(200).json(project)
      } else {
        res.status(404).json({error: "The project with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res.status(500).json({error: "The project could not be removed."})
    })
});

router.get('/:id', (req, res) =>{
  Projects.getProjectActions(req.params.id)
    .then(project =>{
      if (project[0]){
        res.status(200).json(project)
      } else {
        res.status(404).json({error: "The project with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res.status(500).json({error: "Could not retrieve project actions."})
    })
});


module.exports = router;