const { Product } = require("../models/Product");

const shopView = (req, res) => {
    res.render('shop', {
    });
}

const shopItems = (req, res) => {
    res.render('shopItems', {
    });
}

const adminShop = (req, res) => {
    return res.render('adminShop', {
    });
}

const adminShopCreateView = (req, res) => {
    res.render('adminShopCreate', {
    });
}

const adminShopCreate = async (req, res) => {

    const shopData = {
        name: req.body.name,
        detail: req.body.detail,
        stock: req.body.stock,
        price: req.body.price,
        productImg: req.body.productImg,
    }

    try {
        const product = await Product.create(shopData);
        return res.send({ status: "success", message: "The Product data created successfully!" });
    } catch (error) {
        return res.send({ status: "error", message: error.message });
    }
}

module.exports = {
    shopView,
    shopItems,
    adminShop,
    adminShopCreateView,
    adminShopCreate,
}