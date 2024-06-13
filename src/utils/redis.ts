/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'redis';

const redisHost = process.env.REDIS_HOST;
const redisPort = Number(process.env.REDIS_PORT);
const redisPassword = process.env.REDIS_PASSWORD;
const redisExpiration = Number(process.env.REDIS_EXPIRATION);
export const fetchDataFromRedis = async ({
  redisUniqueId,
}: {
  redisUniqueId: string;
}): Promise<any> => {
  const redisClient = createClient({
    password: redisPassword,
    socket: {
      host: redisHost,
      port: redisPort,
    },
  });

  await redisClient.connect();

  redisClient.on('connect', (err: any) => {
    console.log('Redis Client connected', err);
  });
  redisClient.on('error', (err: any) => {
    console.log('Redis Client Error', err);

    throw new Error(`Redis Client Error ${err}`);
  });

  const data = await redisClient.get(redisUniqueId);
  await redisClient.disconnect();
  return data;
};

export const setDataToRedis = async ({
  redisUniqueId,
  data,
}: {
  redisUniqueId: string;
  data: any;
}): Promise<any> => {
  const redisClient = createClient({
    password: redisPassword,
    socket: {
      host: redisHost,
      port: redisPort,
    },
  });

  await redisClient.connect();

  redisClient.on('connect', (err: any) => {
    console.log('Redis Client connected', err);
  });
  redisClient.on('error', (err: any) => {
    console.log('Redis Client Error', err);

    throw new Error(`Redis Client Error ${err}`);
  });

  await redisClient.setEx(redisUniqueId, redisExpiration, JSON.stringify(data));

  console.log('successfully cached colection and their schema');

  await redisClient.disconnect();

  return data;
};
