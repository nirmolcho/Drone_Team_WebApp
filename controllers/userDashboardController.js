//v12
const { ObjectId } = require("mongodb");
const { User } = require("../models/User");

const userDashboard = async (req, res) => {
    try {
        const user = await User.aggregate(
            [
                { $match: { _id: new ObjectId(req.user._id) }},
                {
                    $lookup: {
                        from: 'orders',
                        localField: '_id',
                        foreignField: 'user',
                        pipeline: [
                            {
                                $lookup: {
                                    from: 'products',
                                    localField: 'product',
                                    foreignField: '_id',
                                    as: 'products',
                                },
                            },
                            {
                                $project: {
                                    _id: 1,
                                    quantity: 1,
                                    totalPrice: 1,
                                    cart: 1,
                                    user: 1,
                                    products:1,
                                },
                            }
                        ],
                        as: 'orders',
                    },
                },
                {
                    $sort: { 'orders.createdAt': -1 }
                },
                {
                    $lookup: {
                        from: 'carts',
                        localField: '_id',
                        foreignField: 'user',
                        pipeline: [
                            { $match: { status: { $ne: 'deleted'} } },
                            { $group: { _id: null, count: { $sum: 1 } } },
                        ],
                        as: 'carts',
                    },
                },
                {
                    $lookup: {
                        from: 'flights',
                        localField: '_id',
                        foreignField: 'user',
                        pipeline: [
                            { $match: { user: new ObjectId(req.user._id) } },
                            { $sort: { 'flights.createdAt': -1 }  },
                            { $limit: 1 }
                        ],
                        as: 'lastFlight',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        email: 1,
                        role: 1,
                        orders: 1,
                        carts: 1,
                        lastFlight: 1
                    },
                }
            ]
        );

        res.render('userDashboard', {
            status: '',
            user: user[0]
        });
    } catch (error) {
        res.status(500).send(error.message);
    }

}

module.exports = {
    userDashboard
}