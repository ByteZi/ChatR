const User = require('../model/boxchat.model')
const jwt = require('jsonwebtoken')

module.exports = {

    getAll: (req, res) =>{
        User.find({})
            .then(allUsers => res.json({allUsers}))
    },
    findOne:(req, res) => {
        User.findOne({userName : req.params.username})
            .then(user=> res.json(user))
            .catch(err => res.json(err))
    },
    register: (req, res) => {
        User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
     
            res
                .cookie("usertoken", userToken, secret, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user });
        })
            .catch(err => res.status(400).json(err))//Still catching error after Successfuly posting user
    },
    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if(user === null) {
            return res.sendStatus(400);
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            return res.sendStatus(400);
        }

        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
      
        res.cookie("usertoken", userToken, secret, {httpOnly: true})
            .json({ msg: "success!" });
    },
    logout : (req,res) => {
        res.clearCookie('usertoken')
        res.sendStatus(200)
    }
}