var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');

router.get('/', StudentManager.getAll);

router.get('/:id', StudentManager.getStudentById);

router.post('/create', StudentManager.create);

router.put('/update', StudentManager.update);

router.delete('/delete', StudentManager.delete);

module.exports = router;
