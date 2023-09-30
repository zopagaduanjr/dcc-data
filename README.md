# dcc-data
DCC data collected from Place API &amp; Elevation API

# Place searcher
run `node index.js` to search for a place.

Given a `placeName`, it will call [Place Autocomplete API](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete) to find the place and get its `place_id` value.

Given a `placeId`, it will call [Place Details API](https://developers.google.com/maps/documentation/javascript/examples/place-details) to find the place details such as geometry, name, vicinity, etc.

Given a `location`, it will call [Elevations API](https://developers.google.com/maps/documentation/elevation/start) to find the elevation of the location.

## Sample search
request `search("Hid'n Coffee");`

response 

```
zal@Terminal dcc-data % node index.js
====Search AutoComplete====
Description Hid'n Coffee, Nicasio Torres Street, Obrero, Davao City, Davao del Sur, Philippines
Place ID ChIJwZI84Q1t-TIRrTNN-j2cWjA
====Search Place Details====
Name Hid'n Coffee
Location { lat: 7.090085600000001, lng: 125.6146544 }
====Search Place Elevation====
Elevation 7.885401725769043
zal@Terminal dcc-data %

```
