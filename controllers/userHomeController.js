const { User } = require("../models/User");

const userHome = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.render('userHome', {
            status: '',
            user: user
        });
    } catch (error) {
        res.status(500).send(error.message);
    }

}

module.exports = {
    userHome
}