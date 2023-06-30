const router = require('express').Router();
const Budget = require('../../models/Budgets');

router.get('/:id', async (req, res) => {
    try {
        const userData = await Budget.findByPk(req.params.id);
        if(!userData) {
            res.status(404).json({ message: 'Cannot find this budget'});
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await Budget.create(req.params.id);
        if(!userData) {
            res.status(404).json({ message: 'could not not create this budget' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userData = await Budget.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!userData[0]) {
            res.status(404).json({ message: 'No user with this id' });
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userData = await Budget.destroy({
            where: {
                id: req.params.id,
            },
        });
        if(!userData) {
            res.status(404).json({ message: 'No budget with this id' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;