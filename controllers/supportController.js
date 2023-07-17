const Twitter = require('twitter');

const supportView = async (req, res) => {

    res.render('support', {

        status: ''
    });
}

const contactSend = async (req, res) => {

    res.render('support', {
        status: ''
    });
}

module.exports = {
    supportView,
    contactSend
}