import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Flask backend

export const uploadCVs = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));

  // Added timeout for better network error handling (optional)
  const response = await axios.post(`${API_URL}/upload_cv`, formData, {
    timeout: 1000000, // 60 seconds timeout (optional)
  });
  return response.data;
};

export const queryCVs = async (query) => {
  const response = await axios.post(`${API_URL}/query_cv`, { query });
  console.log("response", response.data);
  return response.data;
};
