const { Router } = require('express');
const bodyParser = require('body-parser');

const connection = require('./config');

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

/* GET index page. */
router.get('/player', (req, res) => {
  connection.query('SELECT * from player', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des compagnons');
    } else {
      res.json(results);
    }
  });
});

router.get('/players/names', (req, res) => {
  connection.query('SELECT name from player', (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.get('/players/name', (req, res) => {
  if (req.query.contain) {
    const { contain } = req.query;
    connection.query(`SELECT name from player where name like'%${contain}%'`, (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  } else if (req.query.start) {
    const { start } = req.query;
    connection.query(`SELECT name from player where name like'${start}%'`, (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  } else if (req.query.dat) {
    const { dat } = req.query;
    connection.query(`SELECT name from player where first_app >'${dat}'`, (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  } else if (req.query.order) {
    const { order } = { ...req.query };
    connection.query(`SELECT name from player order by name ${order}`, (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  }
});

router.post('/players', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO player SET ?', formData, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/player/:id', (req, res) =>{
  const idEmployee = req.params.id;
  const formData = req.body;
  connection.query('UPDATE player SET ? WHERE id = ?', [formData, idEmployee], (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/player/life/:id', (req, res) =>{
  const idEmployee = req.params.id;
  connection.query(`UPDATE player SET alive = !alive WHERE id = ${idEmployee}`, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/player/:id', (req, res) => {
  const idEmployee = req.params.id;
  connection.query('DELETE FROM player WHERE id = ?', [idEmployee], (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/players/dead', (req, res) => {
  connection.query('DELETE FROM player WHERE alive = false', (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
