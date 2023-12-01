// apiService.js
import axios from 'axios';

const csrfToken = "AxlXvwZwSzf9WFQMxceoRliqDkQGqzRxwvoXeHvxV1n9mJJv1yK2PODEC7m8DDij";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Replace with your API server URL
  withCredentials: true, // Enable sending and receiving cookies
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken, // Include your CSRF token here if required
  },
});


// Function to make a GET request
function fetchDataFromAPI(url_endpoint) {
  return axiosInstance.get(url_endpoint)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

// Function to make a POST request
function postDataToAPI(url_endpoint, data) {
  return axiosInstance.post(url_endpoint, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

// Function to make a PUT request
function putDataToAPI(url_endpoint, data) {
  return axiosInstance.put(url_endpoint, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

export { fetchDataFromAPI, postDataToAPI, putDataToAPI };
