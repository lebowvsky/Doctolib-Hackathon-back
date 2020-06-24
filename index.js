const express = require('express');
const connection = require('./conf');
const app = express();
const port = 8080;

// Support JSON-encoded bodies
app.use(express.json());
// Support URL-encoded bodies
app.use(express.urlencoded({
  extended: true
}));


// PATIENT
app.post('/api/patients', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO patient SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/api/patients', (req, res) => {
  connection.query('SELECT * FROM patient', (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

app.get('/api/patients/:id', (req, res) => {
  const idPatient = req.params.id;
  connection.query('SELECT * FROM patient WHERE id WHERE id = ?', idPatient, (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  })
})

//MEDECIN
app.get('/api/medecins', (req, res) => {
  connection.query('SELECT * FROM medecin', (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

app.post('/api/medecins', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO medecin SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

//COMMANDE
app.get('/api/commandes', (req, res) => {
  connection.query('SELECT * FROM commande', (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

app.post('/api/commandes', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO commande SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

//ORDONNANCE
app.get('/api/ordonnances', (req, res) => {
  connection.query('SELECT * FROM ordonnance', (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

app.post('/api/ordonnances', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO ordonnance SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

//PRODUIT
app.post('/api/produits', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO produit SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/api/produits', (req, res) => {
  connection.query('SELECT * FROM produit', (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

//SERVER LISTENING
app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});