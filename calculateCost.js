const vehicles = require("./vehicles");

function calculateCost(vehicleType, distance, duration) {
  let cost;
  switch (vehicleType) {
    case "Escalade ESV Suv":
      cost =
        vehicles["Escalade ESV Suv"].baseCost +
        (distance / 1609) * vehicles["Escalade ESV Suv"].costPerMile +
        (duration / 60) * vehicles["Escalade ESV Suv"].costPerMinute;
      break;

    case "Suburban SUV":
      cost =
        vehicles["Suburban SUV"].baseCost +
        (distance / 1609) * vehicles["Suburban SUV"].costPerMile +
        (duration / 60) * vehicles["Suburban SUV"].costPerMinute;
      break;

    case "Mercedes Benz S Class":
      cost =
        vehicles["Mercedes Benz S Class"].baseCost +
        (distance / 1609) * vehicles["Mercedes Benz S Class"].costPerMile +
        (duration / 60) * vehicles["Mercedes Benz S Class"].costPerMinute;
      break;

    case "Cadillac CT6 Sedan":
      cost =
        vehicles["Cadillac CT6 Sedan"].baseCost +
        (distance / 1609) * vehicles["Cadillac CT6 Sedan"].costPerMile +
        (duration / 60) * vehicles["Cadillac CT6 Sedan"].costPerMinute;
      break;
    default:
      cost = 0;
  }
  // do not round the cost
  return cost;
}

module.exports = {
  calculateCost,
};
