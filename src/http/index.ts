import axios from "axios";

export const API_URL = 'https://sw-api.starnavi.io';

const $api = axios.create({
    baseURL: API_URL,
});

export default $api