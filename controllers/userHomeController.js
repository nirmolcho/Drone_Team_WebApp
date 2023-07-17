
const userHome = (req, res) => {
    res.render('userHome', {
        status: ''
    });
}

module.exports = {
    userHome
}