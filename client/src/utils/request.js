import axios from 'axios';

const BASE_API_URL = 'http://localhost:9000';

const request = async (url, method, body = {}, token) => {
  try {
    const response = await axios({
      method,
      headers: (token) ? { Auth: token } : null,
      url: `${BASE_API_URL}/api${url}`,
      data: body,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export default request;
