const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./handler');
const cartFilePath = 'server/db/userCart.json';

router.get('/', (req, res) => {
    fs.readFile(cartFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});
router.post('/', (req, res) => {
    handler(req, res, 'add', cartFilePath);
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', cartFilePath);
});
router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', cartFilePath);
});

module.exports = router;