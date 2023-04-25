// rest template apis
const Template = require('../model/template');
const express = require('express');
const router = express.Router();

router.get('/template', async (req, res) => {
    const temps = await Template.find({}).sort({ update_at: -1 });
    res.$success(temps);
});

router.post('/template', async (req, res) => {
    try {
        const temps = await Template.create(req.body);
        res.$success(temps);
    } catch (e) {
        res.$error(e)
    }
});

router.get('/template/:id', async (req, res) => {
    const temps = await Template.findById({ _id: req.params.id })
    if (temps) {
        res.$success(temps);
    } else {
        res.$success({}, 400);
    }
});

router.put('/template/:id', async (req, res) => {
    const temps = await Template.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    )
    if (temps) {
        res.$success(temps);
    } else {
        res.$success({}, 400);
    }
});

router.delete('/template/:id', async (req, res) => {
    try {
        await Template.findByIdAndRemove({ _id: req.params.id })
        res.$success('删除成功');
    } catch (e) {
        res.$error(e, 400);
    }
});

module.exports = router;

// http POST :8080/xhr/v1/template name='test2' template='<h1>welcome to ${name}</h1>' data='{name:express}'