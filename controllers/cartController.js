const { Cart } = require("../models/Cart");
const { ObjectId } = require('mongodb');

const myCartView = async (req, res) => {
    const myCarts = await Cart.find({ user: new ObjectId(req.user._id), status: 'active' })
        .populate({
            path: 'user',
            select: {
                _id: 1, firstName: 1, lastName: 1, email: 1, role: 1,
            },
        })
        .populate({
            path: 'product',
            select: {
                _id: 1, name: 1, detail: 1, stock: 1, price: 1, productImg: 1,
            },
        }).select('-__v');

    res.render('myCart', {
        myCarts: myCarts
    });
}


const myCartCreate = async (req, res) => {
    const { product, quantity } = req.body;
    const userId = req.user._id;
    try {
        await Cart.create({
            product: product,
            user: userId,
            quantity: quantity
        });
        return res.send({ status: "success", message: "The Cart data created successfully!" });
    } catch (error) {
        return res.send({ status: "error", message: error.message });
    }
}

const myCartDelete = async (req, res) => {
    const { cartId } = req.body;
    try {
        await Cart.findOneAndUpdate({ _id: new ObjectId(cartId) }, { status: 'delete' }, { new: true });
        return res.send({ status: "success", message: "The Cart data deleted successfully!" });
    } catch (error) {
        return res.send({ status: "error", message: error.message });
    }
}

module.exports = {
    myCartView,
    myCartCreate,
    myCartDelete,
}