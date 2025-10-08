import { ENV } from '@/pages/env';
import axios from 'axios';

export const Fetch = axios.create({
  baseURL: `${ENV.API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});
