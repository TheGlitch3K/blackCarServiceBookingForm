README

This project uses a MySQL database and the Google Maps API.

config.json:
{
"mysql": {
"host": "localhost",
"user": "bookings",
"password": "bcsbooking",
"database": "bookings"
},
"maps_api_key": "YOUR_API_KEY"
}

.env:
DB_HOST=localhost
DB_USER=bookings
DB_PASSWORD=bcsbooking
DB_DATABASE=bookings
GOOGLE_MAPS_API_KEY=AIzaSyCLwEfRxI7J60WeetwUYE5Gs_yMSQ6m2DI

Installation:

# Install dependencies

npm install

# Start the server

npm start
