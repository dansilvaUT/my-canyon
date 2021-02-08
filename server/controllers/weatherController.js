const { API_KEY } = process.env;
const axios = require('axios');

module.exports = {
    getWeather: (req, res) => {
        const { zipcode } = req.body;
        console.log(zipcode);
        axios.post(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&APPID=${API_KEY}`)
            .then((weather) => {
                res.send(weather.data).status(200);
            })
            .catch(err => console.log(`Controller Error: ${err.message}`));
    }
}