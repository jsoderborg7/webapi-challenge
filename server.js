const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) =>{
  res.json(`<h2>Look what I made!</h2>`)
});

const projectRouter = require('./routers/project-router');
const actionRouter = require('./routers/action-router');



function logger(req, res, next){
  console.log(`${req.method} made on ${req.url}`);
  next();
};

server.use(logger);


server.use('/api/projects', projectRouter);
// server.use('/api/actions', actionRouter);



module.exports = server;
