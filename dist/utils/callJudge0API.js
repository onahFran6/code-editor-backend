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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callJudge0API = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const JUDGE0_API_HEADERS = {
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': config_1.default.JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
};
const callJudge0API = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof data === 'string') {
        const response = yield axios_1.default.get(`${JUDGE0_API_URL}/${data}`, JUDGE0_API_HEADERS);
        return response.data;
    }
    const response = yield axios_1.default.post(JUDGE0_API_URL, data, JUDGE0_API_HEADERS);
    return response.data;
});
exports.callJudge0API = callJudge0API;
//# sourceMappingURL=callJudge0API.js.map