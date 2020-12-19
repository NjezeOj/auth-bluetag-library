const router = require('express').Router();
let BookLending = require('../schemas/BookLending');

router.route('/').get((req, res) => {    
    BookLending.find()
        .then(policies => res.json(policies))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/policy').post((req, res) => {
    const maxnobooksstudent = req.body.maxnobooksstudent;
    const maxnobookslecturer = req.body.maxnobookslecturer;
    const maxnodaysstudent = req.body.maxnodaysstudent;
    const maxnodayslecturer = req.body.maxnodayslecturer;
    const penaltystudent = req.body.penaltystudent;
    const penaltylecturer = req.body.penaltylecturer;

    const lendingRules = new BookLending({ 
        maxnobooksstudent,
        maxnobookslecturer,
        maxnodaysstudent,
        maxnodayslecturer,
        penaltystudent,
        penaltylecturer
     });

    lendingRules.save()
        .then(() => res.status(200).json('rules added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    BookLending.findByIdAndDelete(req.params.id)
        .then(() => res.json("LendBook Deleted"))
        .catch(err => res.status(400).json('Error:' + err))
});


module.exports = router;