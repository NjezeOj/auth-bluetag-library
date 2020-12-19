const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {requireLogin} =  require('../middleware/auth')
let User = require("../schemas/User")
let LendBook = require("../schemas/LendBook")
require('dotenv').config();

const jwtSecret = process.env.jwtSecret;



router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/register').post(async(req, res) => {
    
    const regno = req.body.regno;
    const name = req.body.name;
    const address = req.body.address;
    const department = req.body.department;
    const phoneno = req.body.phoneno;  
    const borrowertype = req.body.borrowertype;  
    const bookdescription = [];
    const password = req.body.password;
    
    try{
        let user = await User.findOne({regno})
        if(user)
            return res.status(401).json({ msg: "There is already user with this e-mail"})

        const hashed_password = await bcrypt.hash(password, 10)
        let newUser = new User({
            regno,
            address,
            name,
            department,
            phoneno,
            bookdescription,
            borrowertype,
            count: 0,
            password: hashed_password,
            role: "User",
            
        });

        newUser.save()
            .then(() => res.status(200).json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (err){
        res.status(400).json('Error: ' + err);
    }
    
});

router.post('/login', async(req, res) => {
    const {regno, password} = req.body
    try{
        let user = await User.findOne({regno})
        if(!user)
            return res.status(400).json({ error: "Invalid Credentials" });
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: "Password doesn't match" })
        }

        const token = jwt.sign({_id: user._id}, jwtSecret);
        return res.json({token})
    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
})

router.get('/getuser', requireLogin, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user)
    } catch (err) {
        console.log(err)
    }
})

router.route('/lendbook/:id').post((req, res) => {
    const category = req.body.category;
    const title = req.body.title;
    const callnumber = req.body.callnumber;
    const author = req.body.author;
    const pubyear = req.body.pubyear;
    const volume = req.body.volume;
    const size = req.body.size;
    
    
    const lenddate = Date.parse(req.body.lenddate);
    const returndate = Date.parse(req.body.returndate);    
    const expectedreturndate = Date.parse(req.body.expectedreturndate);
    const borrowertype = req.body.borrowertype;
    const comments = req.body.comments;
    const logtype = req.body.logtype;
    const penalty = req.body.penalty;
    const defaulteddays = req.body.defaulteddays;
    const hasitbeenreturned = req.body.hasitbeenreturned;
    const regno = req.body.regno;


    //const bast = req.body;

    const newLendBook = new LendBook({
        category,
        title,
        callnumber,
        author,
        pubyear,
        volume,
        size,
        lenddate,
        returndate,
        logtype,
        expectedreturndate,
        borrowertype,
        comments,
        penalty,
        defaulteddays,
        hasitbeenreturned,
        regno

    });

    newLendBook.save()
        .then((res) => User.findOneAndUpdate({ _id: req.params.id }, { $push: { bookdescription: res._id } }, { new: true }))
        .then(() => res.status(200).json('Book Lended!'))
        .catch(err => res.status(400).json('Error: ' + err));

});


router.route('/oneuser/:id').get(async(req, res) => {
    let lendbook = await User.findById({ _id: req.params.id }).populate("bookdescription");   
    res.json(lendbook);
});

router.route('/:id').post(async (req, res) => {
    
    const bast = req.body.id
    await User.findOneAndUpdate({ _id: req.params.id }, { $pull: { bookdescription: bast } })
        .then(() => res.status(200).json('Book Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));

})

router.route('/count/:id').post(async (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.count = req.body.count

            user.save()
                .then(() => res.json('Count has been increased'))
                .catch(err => res.status(400).json('Error:' + err))

        })
        .catch(err => res.status(400).json('Error:' + err))
    

})

//write code to edit and delete book description

module.exports = router;