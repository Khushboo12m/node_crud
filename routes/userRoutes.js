const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { firstname, lastname, address, mobile_number } = req.body;
  const sql = 'INSERT INTO users (firstname, lastname, address, mobile_number) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstname, lastname, address, mobile_number], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, message: 'User created' });
  });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'User not found' });
    res.send(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const { firstname, lastname, address, mobile_number } = req.body;
  const sql = 'UPDATE users SET firstname = ?, lastname = ?, address = ?, mobile_number = ? WHERE id = ?';
  db.query(sql, [firstname, lastname, address, mobile_number, req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'User updated' });
  });
});

router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'User deleted' });
  });
});

module.exports = router;
