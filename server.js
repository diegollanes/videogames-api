const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'diego1218',
    database : 'videogames-db'
  }
});

app.get('/home', (req, res) => {
	knex.select('*').from('consoles')
	.then(data => res.json(data))
	.catch(err => res.status(400).json('error en el servidor home'))
})

app.post('/games-list',(req, res) => {
  const { console } = req.body;

  knex.select('company').from('consoles').where('console',console)
  .then(data => {
    if(true){
      return knex.select('*').from('nintendo_games').where('console', console)
      .then(game=>{
        res.json(game);
      })
      .catch(err=> res.status(400).json('error en juegos de nintendo'))
    }
  })
  .catch(err => res.status(400).json('error al cargar lista de juegos'))
})

/*

app.post('/games-list',(req, res) => {
  const { console } = req.body;

  knex.select('company').from('consoles').where('console_name',console)
  .then(data => {
      const isNintendo = (data) => {
        if(data === 'Nintendo') {return true}
        else {return false }
    }
    if(isNintendo){
      return knex.select('*').from('nintendo_games').where('console', console)
      .then(game=>{
        res.json(game);
      })
      .catch(err=> res.status(400).json('error en juegos de nintendo'))
    } else {
      return knex.select('*').from('sony_games').where('console', console)
        .then(game => { 
          res.json(game);
        })
        .catch(err => res.status(400).json('error en juegos de Sony'))
    }
  })
  .catch(err => res.status(400).json('error al cargar lista de juegos'))
})*/

app.listen(3001, () => {
	console.log('app is running on port 3001')
});