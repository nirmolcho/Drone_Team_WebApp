//v12
const { Product } = require("../models/Product");

const homeView = async (req, res) => {

    try {
        const items = await Product.find().limit(3);
        res.render('index', {
            items: items
        });
    } catch (error) {
        res.status(500).send(error.message);
    }

}

module.exports = {
    homeView
}