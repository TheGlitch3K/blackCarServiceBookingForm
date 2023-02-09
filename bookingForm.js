const axios = require("axios");
const { getConnection } = require("./db");
const { calculateRideInfo } = require("./calculateRideInfo");
const { sendBookingEmails } = require("./booking");
const vehicles = require("./vehicles");

async function handleBookingForm(req, res) {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone_number = req.body.phone_number;
  const date = req.body.ride_date;
  const pickup_time = req.body.pickup_time;
  const pickup_location = req.body.pickup_location;
  const dropoff_location = req.body.dropoff_location;
  const number_of_passengers = req.body.number_of_passengers;
  const luggage = req.body.luggage;
  const vehicle_type = req.body.vehicle_type;

  const rideInfo = await calculateRideInfo(pickup_location, dropoff_location);
  const vehicleInfo = vehicles[vehicle_type];
  const cost =
    vehicleInfo.baseCost +
    vehicleInfo.costPerMile * (rideInfo.distance / 1609.34) +
    vehicleInfo.costPerMinute * (rideInfo.duration / 60);

  var formattedCost = cost.toFixed(2);
  console.log("Total Cost: $" + formattedCost);

  // Format the pickup time in "standard" format
  const pickupTime = new Date(`${date} ${pickup_time}`).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  // Format the date in the "standard"
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Insert the booking into the database
  const connection = getConnection();
  connection.query(
    `INSERT INTO bookings (first_name, last_name, email, phone_number, date, pickup_time, pickup_location, dropoff_location, number_of_passengers, luggage, vehicle_type, cost) VALUES ('${first_name}','${last_name}', '${email}', '${phone_number}', '${date}', '${pickup_time}', '${pickup_location}', '${dropoff_location}', '${number_of_passengers}', '${luggage}', '${vehicle_type}', '${formattedCost}')`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.send(
          "There was an error with your booking. Please try again later."
        );
      } else {
        sendBookingEmails({
          name: first_name,
          email: email,
          vehicle: vehicle_type,
          origin: pickup_location,
          destination: dropoff_location,
          totalCost: formattedCost,
          date: formattedDate,
          time: pickupTime,
        });
        res.send(
          "Your booking has been confirmed! Please check your email for more details."
        );
      }
    }
  );
}

module.exports = {
  handleBookingForm,
};
