const { Flight } = require("../models/Flight");
const { Order } = require("../models/Order");
const axios = require("axios");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");

const flightView = async (req, res) => {
  const purchases = await Order.find({ user: req.user._id })
    .populate({
      path: "product",
      select: {
        _id: 1,
        name: 1,
        detail: 1,
        stock: 1,
        price: 1,
        productImg: 1,
      },
    })
    .select("-__v");

  res.render("lastFlight", {
    items: purchases,
    status: "",
  });
};

const flightAdd = async (req, res) => {
  const flightData = {
    date: req.body.date,
    item: req.body.item,
    duration: req.body.duration,
    location: req.body.format_address,
    comment: req.body.comment,
    user: req.user._id,
  };

  // Constructing the tweet message
  const tweetMessage = `New Flight Details: Date - ${flightData.date}, Item used - ${flightData.item}, Duration - ${flightData.duration}, Location - ${flightData.location}, Pilot Comment - ${flightData.comment}.`;

  try {
    const flight = await Flight.create(flightData);


    const request = {
      url: "https://api.twitter.com/2/tweets",
      method: "POST",
    };

    const oauth = new OAuth({
      consumer: {
        key: process.env.TWITTER_API_KEY,
        secret: process.env.TWITTER_API_KEY_SECRET,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });

    const authorization = oauth.authorize(request, {
      key: process.env.TWITTER_API_ACCESS_TOKEN,
      secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
    });

    const response = await axios.post(
      request.url,
      {
        text: tweetMessage,
      },
      { headers: { ...oauth.toHeader(authorization) } }
    );

    return res.send({
      status: "success",
      message: "The Flight data created and tweeted successfully!",
    });
  } catch (error) {
    return res.send({ status: "error", message: error.message });
  }
};

module.exports = {
  flightView,
  flightAdd,
};
