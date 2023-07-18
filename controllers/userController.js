const { User } = require("../models/User");

const userView = async (req, res) => {

    try {
        const users = await User.find();
        res.render('userList', {
            users: users
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
    
}

const userDelete = async (req, res) => {
    const { userId } = req.body;
    try {
        await User.findOneAndDelete({ _id: new ObjectId(userId) });
        return res.send({ status: "success", message: "The User data deleted successfully!" });
    } catch (error) {
        return res.send({ status: "error", message: error.message });
    }
}


module.exports = {
    userView,
    userDelete
}