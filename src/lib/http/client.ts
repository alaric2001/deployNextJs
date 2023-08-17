import axios from 'axios';

const baseUrl = 'http://52.74.21.105/api'; //TODO: move to env

const getBaseUrl = () => {
  return baseUrl;
};

const getDefaultClient = () => {
  return axios.create();
};

const getAuthClient = () => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`, //TODO: get from redux
    },
  });
};

export { getAuthClient, getBaseUrl, getDefaultClient };
