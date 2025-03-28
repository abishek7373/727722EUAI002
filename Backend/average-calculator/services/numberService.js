const axios = require("axios");
require("dotenv").config();

const API_URLS = {
    p: `${process.env.API_BASE_URL}/primes`,
    f: `${process.env.API_BASE_URL}/fibonacci`,
    e: `${process.env.API_BASE_URL}/even`,
    r: `${process.env.API_BASE_URL}/random`,
};

async function fetchNumbers(type) {
    if (!API_URLS[type]) throw new Error("Invalid number ID");

    try {
        const response = await axios.get(API_URLS[type], { timeout: process.env.API_TIMEOUT });
        return response.data || [];
    } catch (error) {
        console.error("Error fetching numbers:", error.message);
        return [];
    }
}

module.exports = { fetchNumbers };
    