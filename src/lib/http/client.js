import axios from 'axios';
import { useCookies } from 'react-cookie';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getBaseUrl = () => {
  return baseUrl;
};
const getDefaultClient = () => {
  return axios.create();
};
const getAuthClient = () => {
  return axios.create({
    headers: {
      Authorization:"" //TODO: get from redux
    },
  });
};

export { getAuthClient, getBaseUrl, getDefaultClient };
