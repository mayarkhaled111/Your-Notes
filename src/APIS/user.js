import axios from "axios";

export function addUser(userData){
    return axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`,userData)
}

export function login(user){
    return axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`,user)
}