import axios from 'axios';

export const ApiClient = axios.create({
    baseURL: "https://localhost:7071/api",
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY,
    },
    timeout: 10000,
});
