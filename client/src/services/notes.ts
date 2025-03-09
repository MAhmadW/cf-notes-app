import axios from 'axios'

import { SERVER_URL } from '@/lib/constants';

export const getNotes = () => {
    return axios.get(`${SERVER_URL}/notes`)
};

export const newNote = () => {
    return axios.post(`${SERVER_URL}/notes`, {title: 'Untitled', content: ''})
};

export const deleteNote = (id: number) => {
    return axios.delete(`${SERVER_URL}/notes/${id}`)
};

export const editNote = (body) => {
    return axios.patch(`${SERVER_URL}/notes`, body)
};