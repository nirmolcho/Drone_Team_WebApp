const shopView = (req, res) => {
    res.render('shop', {
    });
}

const shopItems = (req, res) => {
    res.render('shopItems', {
    });
}

module.exports = {
    shopView,
    shopItems
}