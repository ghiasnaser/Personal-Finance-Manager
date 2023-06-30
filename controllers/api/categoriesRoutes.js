const router = require('express').Router();
const Categories = require('../../models/Categories');

router.get('/:id', async (req, res) => {
    try {
        const userData = await Categories.findByPk(req.params.id);
        if (!userData) {
            res.status(404).json({ message: 'No categories with this id'});
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (res, res) => {
    try {
        const userData = await Categories.create(req.params.id);
        if(!userData) {
            res.status(404).json({ message: 'can not create this category'});
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userData = await Categories.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if(!userData[0]) {
            res.status(404).json({ message: 'No category with this id! '});
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const userData = await Categories.destroy({
            where: {
                id: req.params.id,
            },
        });
        if(!userData) {
            res.status(404).json({ message: 'No category with this id!'});
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;