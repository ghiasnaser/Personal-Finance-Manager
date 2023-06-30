const router = require('express').Router();
const Expenses = require('../../models/Expenses');

router.get('/', async (req, res) => {
    try {
        const userData = await Expenses.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
try {
    const userData = await Expenses.create(req.body);
}
})