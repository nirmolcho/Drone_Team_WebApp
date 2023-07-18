//v12
const axios = require('axios');

const exploreView = async (req, res) => {
    try {

        var ipOptions = {
            method: 'get',
            url: 'https://ipinfo.io/json',
            headers: { }
        };
        const response = await axios(ipOptions);
        const myLocation = response.data;

        let location = "Rishon Lezion, Israel";

        var config = {
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather?appid=bc1301b0b23fe6ef52032a7e5bb70820&units=metric&q=${location}`,
            headers: { }
        };

        const weatherRes = await axios(config);

        return res.render('explore', {
            weatherData: weatherRes.data,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }

}

module.exports = {
    exploreView
}