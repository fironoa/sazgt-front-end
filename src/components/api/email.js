import config from "../configuration/ApiConfig";
/**
 * Function to make a POST request to an API
 * @param {string} url - The API endpoint
 * @param {Object} data - The data to be sent in the POST request
 * @returns {Promise} - A promise that resolves to the response of the POST request
 */
export async function sendMail(data = {}) {
    const url = config.baseURL + '/sazgt/email/send';
    try {
      const response = await fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
      console.error('Error:', error);
    }
  }