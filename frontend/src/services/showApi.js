// src/services/showApi.js
import {ownerInstance} from '../axios/axiosInstance';

//export const fetchAllShows = () => {
  //return userInstance.get("/shows/showlist");
//};

export const getShowDetails = async (showId) => {
  const response = await userInstance.get(`/shows/${showId}`);
  return response.data;
};


export const getShowList = async () => {
  const response = await ownerInstance.get("/shows/showlist");
  return response.data;
};



export const addShow = async (formData) => {
  const token = localStorage.getItem('owner-token');
  const response = await ownerInstance.post('/shows/addshow', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  });

  return response.data;
};



export const deleteShow = async (id) => {
  const token = localStorage.getItem('token');
  const response = await ownerInstance.delete(`/shows/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
