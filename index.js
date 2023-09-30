var http = require("http");
const { Client } = require("@googlemaps/google-maps-services-js");
require("dotenv").config();

const client = new Client({});
const apiKey = process.env.API_KEY;

function pbcopy(data) {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

async function searchAutocomplete(input) {
  var r = await client.placeAutocomplete({
    params: {
      input: input,
      key: apiKey,
    },
    timeout: 1000,
  });
  console.log("Description", r.data.predictions[0].description);
  console.log("Place ID", r.data.predictions[0].place_id);
  return r.data.predictions[0].place_id;
}

async function searchPlaceDetails(placeId) {
  var r = await client.placeDetails({
    params: {
      place_id: placeId,
      key: apiKey,
    },
    timeout: 1000,
  });
  console.log("Name", r.data.result.name);
  console.log("Location", r.data.result.geometry.location);
  pbcopy(JSON.stringify(r.data));
  return r.data.result.geometry.location;
}

function searchElevation(location) {
  client
    .elevation({
      params: {
        locations: [location],
        key: apiKey,
      },
      timeout: 1000,
    })
    .then((r) => {
      console.log("Elevation", r.data.results[0].elevation);
    })
    .catch((e) => {
      console.log(e.response.data.error_message);
    });
}
async function search(placeName) {
  console.log("====Search AutoComplete====");
  var place_id = await searchAutocomplete(placeName);
  console.log("====Search Place Details====");
  var location = await searchPlaceDetails(place_id);
  console.log("====Search Place Elevation====");
  searchElevation(location);
}

search("VNL.DVO");
