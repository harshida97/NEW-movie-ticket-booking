import { userInstance, adminInstance, ownerInstance } from '../axios/axiosInstance';

// register Theater
export const registerTheater = async (data) => {
  const response = await ownerInstance.post('/theaters/registertheater', data);
  return response.data;
};

//  Common: Get all theaters (admin or owner can use this)
export const fetchTheaterList = async () => {
  const response = await userInstance.get('/theaters/list-theaters');
  return response.data;
};

//  Admin-only: Approve a theater
export const approveTheater = async (theaterId) => {
  const response = await adminInstance.put(`/theaters/approve/${theaterId}`);
  return response.data;
};

// Owner-only: Add a new show to a theater (for completeness)
export const addShowToTheater = async (theaterId, showData) => {
  const response = await ownerInstance.post(`/shows/add/${theaterId}`, showData);
  return response.data;
};


//  Admin-only: Delete a theater
export const deleteTheater = async (theaterId) => {
  const response = await adminInstance.delete(`/theaters/deletetheater/${theaterId}`);
  return response.data;
};