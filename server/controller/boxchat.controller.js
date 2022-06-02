const User = require('../model/boxchat.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {

    getAll: (req, res) => {
        User.find({})
            .then(allUsers => res.json({ allUsers }))
    },
    testFind: (req, res) => {
        User.findOne({ userName: req.params.userName })
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },

    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY);
                const secret = process.env.SECRET_KEY

                res
                    .cookie("usertoken", userToken, secret, {httpOnly: true})
                    .json({message : 'This response is a cookie'});
            })
            .catch(err => res.status(400).json(err));
    },

    login: async(req, res) => {
        

        const user = await User.findOne({ userName: req.query.userName });
        if (user === null) {
            return res.sendStatus(400)
        }

        const correctPassword = await bcrypt.compare(req.query.password, user.password);
        if (!correctPassword) {
            return res.sendStatus(400)
        }

        //After Successful Login

        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);

        const secret = process.env.SECRET_KEY
        
        res.cookie("usertoken", userToken, secret, { httpOnly: true })
            .json(user);
        
     
    },

    logout: (req, res) => {
        res.clearCookie('usertoken')
        res.sendStatus(200)
    }
}