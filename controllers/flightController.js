//v12
const { Flight } = require("../models/Flight");
const { Order } = require("../models/Order");

const flightView = async (req, res) => {
    const purchases = await Order.find({ user: req.user._id })
        .populate({ 
            path: 'product',
            select: {
                _id: 1, name: 1, detail: 1, stock: 1, price: 1, productImg: 1,
            },
        }).select('-__v');

    res.render('lastFlight', {
        items: purchases,
        status: ''
    });
}

const flightAdd = async (req, res) => {
    const flightData = {
        date: req.body.date,
        item: req.body.item,
        duration: req.body.duration,
        location: req.body.format_address,
        comment: req.body.comment,
        user: req.user._id,
    }

    try {
        const flight = await Flight.create(flightData);
        return res.send({ status: "success", message: "The Flight data created successfully!" });
    } catch (error) {
        return res.send({ status: "error", message: error.message });
    }

}

module.exports = {
    flightView,
    flightAdd
}