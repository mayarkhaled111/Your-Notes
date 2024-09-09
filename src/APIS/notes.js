import axios from "axios";

let Token = localStorage.getItem('Token')

export function addNote(notesData){
    return axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,notesData,{headers:{Token:'3b8ny__'+Token}})
}

export function getNotes(){
    return axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{headers:{Token:'3b8ny__'+Token}})
}

export function deleteNote(id){
    return axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{headers:{Token:'3b8ny__'+Token}})
}
export function updateNote({id,notesData}){
    return axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,notesData,{headers:{Token:'3b8ny__'+Token}})
}



