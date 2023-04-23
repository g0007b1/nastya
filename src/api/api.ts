import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:3001/',
});

export const apiPost = instance.post;

export const apiGet = instance.get;

export const apiPatch = instance.patch;

export const apiPut = instance.put;

export const apiDelete = instance.delete;
