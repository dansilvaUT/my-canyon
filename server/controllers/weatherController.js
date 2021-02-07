const { API_KEY } = process.env;
const axios = require('axios');

module.exports = {
    getWeather: (req, res) => {
        const { zipcode } = req.query;
        console.log(zipcode);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&APPID=${API_KEY}`)
            .then(() => res.sendStatus(200))
            .catch(err => console.log(`Controller Error: ${err.message}`));
    }
}