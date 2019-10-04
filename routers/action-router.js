const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) =>{
  Actions.get()
    .then(action =>{
      res.status(200).json(action)
    })
    .catch(err =>{
      res.status(500).json({message: "Could not retrieve actions"})
    })
});

router.post('/', (req, res) =>{
  Actions.insert(req.body)
    .then(action =>{
      res.status(200).json(action)
    })
    .catch(err =>{
      res.status(500).json({message: "There was a problem creating this action"})
    })
});

router.put('/:id', (req, res) =>{
  Actions.update(req.params.id, req.body)
    .then(action =>{
      if (action){
        res.status(200).json({...req.body, id: req.params.id})
      } else {
        res.status(404).json({errorMessage: "The action with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res.status(500).json({error: "The action could not be updated."})
    })
});

router.delete('/:id', (req, res) =>{
  Actions.remove(req.params.id)
    .then(action =>{
      if (action){
        res.status(200).json(action)
      } else {
        res.status(404).json({error: "The action with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res.status(500).json({error: "The action could not be removed."})
    })
});



module.exports = router;