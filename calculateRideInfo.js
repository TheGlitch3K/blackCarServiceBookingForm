const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
// const API_KEY = "AIzaSyBGN_1q_RZJosq_faVDzf9KafM-PyVt2Hc";

async function calculateRideInfo(origin, destination) {
  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}%mode=driving&units=imperial&key=${API_KEY}`;
    const response = await axios.get(url);
    console.log(response.data.rows[0].elements[0].distance);
    console.log(response.data.rows[0].elements[0].duration);
    console.log(origin);
    console.log(destination);
    return {
      distance: response.data.rows[0].elements[0].distance.value,
      duration: response.data.rows[0].elements[0].duration.value,
    };
  } catch (error) {
    console.log(error);
    return { distance: 0, duration: 0 };
  }
}

module.exports = {
  calculateRideInfo,
};
