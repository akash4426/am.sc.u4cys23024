const axios = require("axios");

const BASE_URL = "http://20.207.122.201/evaluation-service";

async function getDepots() {
  const res = await axios.get(`${BASE_URL}/depots`);
  return res.data.depots;
}

async function getVehicles() {
  const res = await axios.get(`${BASE_URL}/vehicles`);
  return res.data.vehicles;
}

module.exports = { getDepots, getVehicles };