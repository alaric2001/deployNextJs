import axios from 'axios';
import { parseCookies } from 'react-cookie';
import colorLib from '@kurkle/color';
import {DateTime} from 'luxon';
import 'chartjs-adapter-luxon';
import {valueOrDefault} from '../../dist/helpers.js';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// const fetchData = async () => {
//   const cookies = parseCookies();
//   console.log(cookies);
//   try {
//     const response = await axios.get(`${baseUrl}/${path}`, {
//       headers: {
//         Authorization: `Bearer ${cookies.sanctum_token}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// };

// export default fetchData;