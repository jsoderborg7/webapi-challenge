const express = require('express');

const projectRouter = require('./routers/project-router');
const actionRouter = require('./routers/action-router');

const server = express();

function logger(req, res, next){
  console.log(`${req.method} made on ${req.url}`);
  next();
};

server.use(logger);
server.use(express.json());

server.get('/', (req, res) =>{
  res.json(`<h2>Look what I made!</h2>`)
});

module.exports = server;
