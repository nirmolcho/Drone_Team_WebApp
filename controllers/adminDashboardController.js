const { Order } = require("../models/Order");

const adminDashboard = async (req, res) => {
    try {
        // The existing logic for user statistics.
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

        // New logic for total sales over time.
        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalSales: { $sum: "$totalPrice" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // The existing logic for preparing user statistics.
        let statistics = {};
        let countData = [];
        let userData = [];
        let quantityData = [];
        let totalPriceData = [];
        for (let result of results) {
            userData.push(result._id.user[0]);
            countData.push(result.count);
            quantityData.push(result.quantity);
            totalPriceData.push(result.totalPrice);
        }
        statistics.userData = userData;
        statistics.countData = countData;
        statistics.quantityData = quantityData;
        statistics.totalPriceData = totalPriceData;

        // Preparing sales over time data.
        const dates = salesData.map(data => data._id);
        const sales = salesData.map(data => data.totalSales);

        // Rendering the view with both user statistics and sales over time.
        return res.render('adminDashboard', {
            statistics: statistics,
            sales: {
                dates,
                sales
            },
            status: ''
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    adminDashboard
}
