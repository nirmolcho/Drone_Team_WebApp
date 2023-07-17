const { Product } = require("../models/Product");

const shopView = (req, res) => {
    res.render('shop', {
    });
}

const shopItems = async (req, res) => {
    try {
        const items = await Product.find();
        return res.render('shopItems', {
            items: items,
            status: ''
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const shopItemDetail = async (req, res) => {
    try {
        const item = await Product.findById(req.params.itemId);
        res.render('shopItemDetail', {
            item: item,
            status: 'success'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
    
}

const adminShop = async (req, res) => {
    try {
        const products = await Product.find();
        return res.render('adminShop', {
            products: products
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
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

const adminShopUpdateView = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    console.log(product)
    return res.render('adminShopUpdate', {
        status: '',
        product: product
    });
}

const adminShopUpdate = async (req, res) => {
    let shopData;
    if (req.body.productImg) {
        shopData = {
            name: req.body.name,
            detail: req.body.detail,
            stock: req.body.stock,
            price: req.body.price,
            productImg: req.body.productImg,
        }
    } else {
        shopData = {
            name: req.body.name,
            detail: req.body.detail,
            stock: req.body.stock,
            price: req.body.price,
        }
    }
    try {
        await Product.findOneAndUpdate({ _id: req.params.productId },
            shopData,
            { upsert: true, new: true });
        return res.send({ status: "success", message: "The Product data updated successfully!" });
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
    adminShopUpdateView,
    adminShopUpdate,
    shopItemDetail,
}