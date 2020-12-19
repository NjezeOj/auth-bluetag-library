const router = require('express').Router();
let LendBook = require("../schemas/LendBook");

router.route('/').get((req, res) => {
    LendBook.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json('Error:' + err))
});

router.route('/:id').delete((req, res) => {
    LendBook.findByIdAndDelete(req.params.id)
        .then(() => res.json("LendBook Deleted"))
        .catch(err => res.status(400).json('Error:' + err))
});




module.exports = router;