const express = require("express");
const connection = require("./conf");
const app = express();
const cors = require("cors");
const port = 8080;

app.use(cors());

// Support JSON-encoded bodies
app.use(express.json());
// Support URL-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);

//GET ALL MEDECINS
app.get("/api/medecins", (req, res) => {
  connection.query("SELECT * FROM medecin", (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

//POST NEW MEDECIN
app.post("/api/medecins", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO medecin SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

//GET MEDECIN FROM ID
app.get("/api/medecins/:id", (req, res) => {
  const idMedecin = req.params.id;
  connection.query(
    "SELECT * FROM medecin WHERE id = ?",
    idMedecin,
    (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(results);
      }
    }
  );
});

//GET ALL PATIENTS
app.get("/api/patients", (req, res) => {
  connection.query("SELECT * FROM patient", (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

//POST NEW PATIENT
app.post("/api/patients", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO patient SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

//GET PATIENT FROM ID
app.get("/api/patients/:id", (req, res) => {
  const idPatient = req.params.id;
  connection.query(
    "SELECT * FROM patient WHERE id = ?",
    idPatient,
    (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(results);
      }
    }
  );
});

//GET ALL PATIENTS FROM ID MEDECIN
app.get(`/api/medecins/:id/patients`, (req, res) => {
  const idMedecin = req.params.id;
  connection.query(
    "SELECT p.nom, p.prenom, m.id, o.id FROM medecin AS m JOIN ordonnance AS o ON o.id_medecin=m.id JOIN patient AS p ON o.id_patient=p.id WHERE m.id = ?",
    idMedecin,
    (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(results);
      }
    }
  );
});

//GET ALL ORDONNANCES ???
app.get("/api/ordonnances", (req, res) => {
  connection.query("SELECT * FROM ordonnance", (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

//GET ALL ORDONNANCES FROM ID PATIENT
app.get(`/api/patients/:id/ordonnances`, (req, res) => {
  const idPatient = req.params.id;
  connection.query(
    "SELECT o.id, m.nom, m.prenom FROM medecin AS m JOIN ordonnance AS o ON m.id=o.id_medecin WHERE id_patient = ?",
    idPatient,
    (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(results);
      }
    }
  );
});

//GET ALL ORDONNANCES FROM ID MEDECIN
app.get(`/api/medecins/:id/ordonnances`, (req, res) => {
  const idMedecin = req.params.id;
  connection.query(
    "SELECT o.id, p.nom, p.prenom FROM medecin AS m JOIN ordonnance AS o ON m.id=o.id_medecin JOIN patient AS p ON o.id_patient=p.id WHERE id_medecin = ?",
    idMedecin,
    (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(results);
      }
    }
  );
});

//POST NEW ORDONNANCE
app.post("/api/ordonnances", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO ordonnance SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

//GET ALL COMMANDES ???
app.get("/api/commandes", (req, res) => {
  connection.query("SELECT * FROM commande", (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

//GET COMMANDES FROM ID ORDONNANCE
app.get(`/api/ordonnances/:id/commandes`, (req, res) => {
  const idOrdonnance = req.params.id;
  connection.query(
    "SELECT * FROM commande AS c JOIN ordonnance AS o ON o.id=c.id_ordonnance WHERE id_ordonnance = ?",
    idOrdonnance,
    (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(results);
      }
    }
  );
});

//POST NEW COMMANDE
app.post("/api/commandes", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO commande SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

//GET ALL PRODUITS
app.get("/api/produits", (req, res) => {
  connection.query("SELECT * FROM produit", (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

//POST NEW PRODUIT
app.post("/api/produits", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO produit SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

//SERVER LISTENING
app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${port}`);
});
