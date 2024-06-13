"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDataToRedis = exports.fetchDataFromRedis = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const redis_1 = require("redis");
const redisHost = process.env.REDIS_HOST;
const redisPort = Number(process.env.REDIS_PORT);
const redisPassword = process.env.REDIS_PASSWORD;
const redisExpiration = Number(process.env.REDIS_EXPIRATION);
const fetchDataFromRedis = (_a) => __awaiter(void 0, [_a], void 0, function* ({ redisUniqueId, }) {
    const redisClient = (0, redis_1.createClient)({
        password: redisPassword,
        socket: {
            host: redisHost,
            port: redisPort,
        },
    });
    yield redisClient.connect();
    redisClient.on('connect', (err) => {
        console.log('Redis Client connected', err);
    });
    redisClient.on('error', (err) => {
        console.log('Redis Client Error', err);
        throw new Error(`Redis Client Error ${err}`);
    });
    const data = yield redisClient.get(redisUniqueId);
    yield redisClient.disconnect();
    return data;
});
exports.fetchDataFromRedis = fetchDataFromRedis;
const setDataToRedis = (_b) => __awaiter(void 0, [_b], void 0, function* ({ redisUniqueId, data, }) {
    const redisClient = (0, redis_1.createClient)({
        password: redisPassword,
        socket: {
            host: redisHost,
            port: redisPort,
        },
    });
    yield redisClient.connect();
    redisClient.on('connect', (err) => {
        console.log('Redis Client connected', err);
    });
    redisClient.on('error', (err) => {
        console.log('Redis Client Error', err);
        throw new Error(`Redis Client Error ${err}`);
    });
    yield redisClient.setEx(redisUniqueId, redisExpiration, JSON.stringify(data));
    console.log('successfully cached colection and their schema');
    yield redisClient.disconnect();
    return data;
});
exports.setDataToRedis = setDataToRedis;
//# sourceMappingURL=redis.js.map