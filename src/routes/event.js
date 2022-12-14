const express = require('express');
const {check} = require('express-validator');
const multer = require('multer');

const Event = require('../controllers/event');
const validate = require('../middlewares/validate');

const router = express.Router();

const upload = multer().single('image');

//SEED
router.get('/seed', Event.seed);

//INDEX
router.get('/', Event.index);

//STORE
router.post('/', upload, [
    check('category').not().isEmpty().withMessage('Category is required'),
    check('name').not().isEmpty().withMessage('Productname is required'),
    check('location').not().isEmpty().withMessage('Productlocation is required'),
    check('start_date').not().isEmpty().withMessage('Productstart date and time is required'),
    check('description').not().isEmpty().withMessage('Productdescription is required')
], validate, Event.store);

//SHOW
router.get('/:id',  Event.show);

//UPDATE
router.put('/:id', upload, Event.update);

//DELETE
router.delete('/:id', Event.destroy);

module.exports = router;