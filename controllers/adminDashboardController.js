const { Order } = require("../models/Order");
const { Product } = require("../models/Product");

const adminDashboard = async (req, res) => {
    try {
        const results = await Order.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'users',
                }, 
            },
            {
              $sort: { createdAt: -1 }
            },
            {
              $group: {
                _id: { user: "$users.firstName" },
                count: { $sum: 1 },
                quantity: { $sum: "$quantity" },
                totalPrice: { $sum: "$totalPrice" },
              }
            }
        ]);
        let statistics = {};
        let countData = [];
        let userData = [];
        let quantityData = [];
        let totalPriceData = [];
        for (let result of results) {
            userData.push(result._id.user[0])
            countData.push(result.count);
            quantityData.push(result.quantity);
            totalPriceData.push(result.totalPrice);
        }
        statistics.userData = userData;
        statistics.countData = countData;
        statistics.quantityData = quantityData;
        statistics.totalPriceData = totalPriceData;
        return res.render('adminDashboard', {
            statistics: statistics,
            status: ''
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    adminDashboard
}