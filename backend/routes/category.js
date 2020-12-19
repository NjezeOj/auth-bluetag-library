const router = require('express').Router();
let Category = require("../schemas/Category");

router.route('/').get((req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/register').post((req, res) => {
    const category = req.body.category;
    

    const newCategory = new Category({
        category
    });

    newCategory.save()
        .then(() => res.status(200).json('Category added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});



module.exports = router;