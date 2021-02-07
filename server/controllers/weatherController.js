const { API_KEY } = process.env;
const axios = require('axios');

module.exports = {
    getWeather: async (req, res) => {
        const { zipcode } = req.body;
        await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}q=${zipcode}`)
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => console.log(`Controller Error: ${err.message}`));
    }
}