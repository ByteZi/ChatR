const User = require('../model/boxchat.model')

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
    addUser: (req, res) => {
        User.create(req.body)
            .then(newUser => res.json({newUser}))
            .catch(err => res.status(400).json(err))
    },
    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if(user === null) {
            // email not found in users collection
            return res.sendStatus(400);
        }
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            // password wasn't a match!
            return res.sendStatus(400);
        }
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }
}