import axios from 'axios';
import {useQuery} from 'react-query';

const BASE_URL = 'https://api.jikan.moe/v4';

export const client = axios.create({
  baseURL: BASE_URL,
});

export default client;
