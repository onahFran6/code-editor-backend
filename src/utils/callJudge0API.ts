import axios from 'axios';
import config from '../config';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const JUDGE0_API_HEADERS = {
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': config.JUDGE0_API_KEY,
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
  },
};

export const callJudge0API = async (
  data: string | { source_code: string; language_id: number },
) => {
  if (typeof data === 'string') {
    const response = await axios.get(
      `${JUDGE0_API_URL}/${data}`,
      JUDGE0_API_HEADERS,
    );
    return response.data;
  }

  const response = await axios.post(JUDGE0_API_URL, data, JUDGE0_API_HEADERS);
  return response.data;
};
