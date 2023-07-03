const { Product } = require("../models/Product");

const adminHome = async (req, res) => {
    try {
        const products = await Product.find();
        return res.render('adminHome', {
            products: products,
            status: ''
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    adminHome
}