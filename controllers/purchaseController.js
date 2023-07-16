const { ObjectId } = require("mongodb");
const { Order } = require("../models/Order");

const purchaseView = async (req, res) => {
    try {
        const purchases = await Order.find({ user: req.user._id })
            .populate({ 
                path: 'product',
                select: {
                    _id: 1, name: 1, detail: 1, stock: 1, price: 1, productImg: 1,
                },
            }).select('-__v');;

        res.render('purchase', {
            status: '',
            purchases: purchases
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
    
}

module.exports = {
    purchaseView
}