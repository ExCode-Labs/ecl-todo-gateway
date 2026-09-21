import axios from 'axios';
import { env } from '../../config/env';

const getBaseUrl = () => {
  if (env.NODE_ENV === 'production') return env.BACKEND_URL_PROD;
  if (env.NODE_ENV === 'test') return env.BACKEND_URL_UAT;
  return env.BACKEND_URL_DEV;
};

const fetcher = axios.create({
  baseURL: getBaseUrl() + '/api',
  withCredentials: true,
});

export default fetcher;
